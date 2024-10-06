/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, ExternalLink } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";

/*
 * Display panel only for the following list.
 */
const allowedBlocks = ["core/group"];

/**
 * Add new attributes
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes(settings) {
	// check if object exists for old Gutenberg version compatibility
	// add allowedBlocks restriction
	if (
		typeof settings.attributes !== "undefined" &&
		allowedBlocks.includes(settings.name)
	) {
		settings.attributes = Object.assign(settings.attributes, {
			contentVisibilityAuto: {
				type: "boolean",
				default: false,
			},
		});
	}

	return settings;
}

addFilter(
	"blocks.registerBlockType",
	"content-visibility-auto/add-attributes",
	addAttributes,
);

/**
 * Add the datalayers section
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const contentVisibilityAutoControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!allowedBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes, isSelected } = props;

		const { contentVisibilityAuto } = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (
					<InspectorControls>
						<PanelBody title={__("Rendering performance")} initialOpen={false}>
							<ToggleControl
								label={__("Improve content rendering")}
								checked={contentVisibilityAuto}
								onChange={(toggle) =>
									setAttributes({
										contentVisibilityAuto: toggle,
									})
								}
								help={__("Best use on below-the-fold sections of long pages.")}
							/>

							<p>
								{__(
									"The content-visibility CSS property enables the user agent to skip an element's rendering work until it is needed.",
								)}{" "}
								<ExternalLink href="https://web.dev/articles/content-visibility">
									{__("Learn more on Web.dev")}
								</ExternalLink>
							</p>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, "contentVisibilityAutoControl");

addFilter(
	"editor.BlockEdit",
	"content-visibility-auto/add-control",
	contentVisibilityAutoControl,
);
