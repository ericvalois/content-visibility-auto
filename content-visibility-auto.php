<?php
/**
 * Plugin Name:       Content Rendering Performance
 * Description:       This utility plugin allows the browser to delay group block rendering, significantly speeding up the initial page load.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.1
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       content-visibility-auto
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class SectionsContentVisibility {

	public $assets_handle;
	public $allowed_blocks;

	public function __construct() {
		$this->assets_handle = 'content-visibility-auto';
		$this->allowed_blocks = array("core/group");

		add_action( 'enqueue_block_editor_assets', array( $this, 'sections_content_visibility_editor_scripts' ) );
		
		foreach ($this->allowed_blocks as $key => $block_name) {
			add_filter( 'render_block_' . $block_name, array( $this, 'add_tracking_attributes' ), 10, 2 );
		}
	}

	/*
	* Register editor's assets
	*/
	public function sections_content_visibility_editor_scripts() {
		$script_path = 'build/index.js';
		$script_asset_path = require( dirname(__FILE__) . '/build/index.asset.php' );
		wp_enqueue_script( 'content-visibility-auto', plugin_dir_url(__FILE__) . $script_path, $script_asset_path['dependencies'], $script_asset_path['version'], true ); 
	}

	/*
	* Add content-visibility inline style property.
	*/
	public function add_tracking_attributes( $block_content, $block ) {

		if (empty($block_content)){
			return $block_content;
		}

		if( !isset( $block['attrs']['sectionContentVisibility'] ) || empty( $block['attrs']['sectionContentVisibility'] ) ){
			return $block_content;
		}
		
		$dom = new WP_HTML_Tag_Processor( $block_content );
		
		$dom->next_tag();
        $current_style = $dom->get_attribute( 'style' );
		$dom->set_attribute( 'style', 'content-visibility: auto;' . $current_style );
		
		$new_dom = $dom->get_updated_html();

		return $new_dom;
	}

}

$SectionsContentVisibilityInstance = new SectionsContentVisibility();
