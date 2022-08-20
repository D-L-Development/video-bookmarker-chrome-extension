import { guid } from "./utility";

const uuid = guid();
let video = null;
let level = 0;

const findVideo = (ctx) => {
  console.log(uuid, level++);
  const videos = ctx.getElementsByTagName("video");
  // return the video if found
  if (videos[0]) return videos[0];
  // get other iframes in the context
  const iframes = ctx.getElementsByTagName("iframe");
  if (iframes.length === 0) return null;
  // search for video in each iframe recursively
  for (let i = 0; i < iframes.length; i++) {
    try {
      return findVideo(iframes[i].contentWindow.document);
    } catch (e) {
      console.log("failed", uuid);
      return null;
    }
  }
};

chrome.runtime.onConnect.addListener((port) => {
  video = findVideo(document);
  console.log(video);
});
