# Web Video Bookmarks

## Introduction

Web Video Bookmarks is a Chrome extension designed to help users organize their notes into an easy-to-understand file
system.
The extension looks for a video in the document and uses it to allow the user to add annotations to certain times in the
video.
The user is able to add annotations and edit annotations, as well as jump to certain key points in the video based on
the timestamp.
Although the annotations are persistent in the browser, you can still download any annotations as a pdf format to view
later
or share with your peers.

🔗 [View Landing Page](https://video-bookmaker-page.vercel.app)

## For Developers

After cloning the repository, follow the steps below to get the extension working:

### Download dependencies

`npm install`

### Build the extension

If you want a production version of the extension, run the command: `npm run build` otherwise, run the
command: `npm run dev`
to get a development version, which has hot reloading enabled

> Be mindful that changes made to the content scripts require the extension to be reloaded in Chrome, while changes to
> the src directory will require only the page to be reloaded

### Load the extension in Chrome

1. Navigate to the list of your downloaded extensions by going to [chrome://extensions](chrome://extensions)
2. Enable developer mode by toggling the switch in the upper right corner
3. Click "Load Unpacked" and locate the extension directory located at repo/build/extension.
4. Go to a web page with a video in it such as [YouTube](https://www.youtube.com/)
5. In the upper right corner of the tab, pin the extension icon for ease of use.
6. Once the extension icon is clicked, a side menu popup will show up.
7. Now, you can use the extension to add annotations :)

