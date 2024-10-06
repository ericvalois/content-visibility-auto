# Content Visibility Auto WordPress Plugin

This WordPress utility plugin lets you turn on the `content-visibility` CSS property for group blocks. That property allows the browser to delay an element's rendering, including layout and painting until needed.

According to Google, you can significantly speed up the initial page load by skipping rendering on large portions of off-screen content.

Use this on long pages below-the-fold sections.

[Read more about the property on Web.dev](https://web.dev/articles/content-visibility)

<figure>
    <img src="assets/screenshot-1.png" alt="Content visibility panel screenshot" />
    <figcaption>Content visibility panel screenshot.</figcaption>
</figure>

<figure>
    <img src="assets/google-demo-content-visibility-auto.jpg" alt="Google demo of the content-visibility CSS property page speed benefits." />
    <figcaption>Source: <a href="https://web.dev/articles/content-visibility">Web.dev</a> - Google demo applying content-visibility: auto to chunked content areas gives a 7x rendering performance boost on initial load.</figcaption>
</figure>
