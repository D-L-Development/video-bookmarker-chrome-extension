export const fakeDB = {
  ALL_SESSIONS: {
    ROOT_FOLDERS: [{ uuid: "2g4s-2x8s-2xb6", name: "Game" }],
    ROOT_SESSIONS: [
      { uuid: "2cvs-658s-2126", name: "Lecture 12", date: "12/01/22" },
    ],
  },
  // SESSION
  "2cvs-658s-2126": {
    name: "Lecture 12",
    bookmarks: {
      "04:32:12": {
        isNested: false,
        timestamp: "04:32:12",
        title: "Pay attention here",
        text: "lorem ipsum",
      },
    },
  },
  // FOLDER
  "2g4s-2x8s-2xb6": {
    parent: null,
    name: "Game",
    folders: ["212x-228s-2xb6"],
    sessions: [],
  },
  "212x-228s-2xb6": {
    parent: "2g4s-2x8s-2xb6",
    name: "First Week",
    folders: [],
    sessions: [],
  },
};
