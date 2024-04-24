Using the bleeding edge [Document Picture-in-Picture API](https://developer.chrome.com/docs/web-platform/document-picture-in-picture#:~:text=The%20Document%20Picture%2Din%2DPicture,Picture%2Din%2DPicture%20window.) that only works in recent Chromium browsers, we can send a portion of page into a picture window using this component.

[[DocumentInPicture.composition]]

If we set `openPictureWindowOnMount` to true, the picture window will automatically open on mount assuming user action was responsible for whatever lead to the mounting of the component.

[[DocumentInPicture.onMount.composition]]

Note that, you can also specify starting heights, though once the user resizes the window manually, the browser may override what you set.

Inside of this window, `window.moveTo()` and `window.moveBy()` are disabled as per [spec](https://wicg.github.io/document-picture-in-picture/#positioning).

[//begin]: # "Autogenerated link references for markdown compatibility"
[DocumentInPicture.composition]: DocumentInPicture.composition "DocumentInPicture"
[DocumentInPicture.onMount.composition]: DocumentInPicture.onMount.composition "DocumentInPicture.onMount"
[//end]: # "Autogenerated link references"