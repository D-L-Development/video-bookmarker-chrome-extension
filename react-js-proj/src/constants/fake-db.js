export const fakeDB = {
  ROOT: {
    folders: [{ uuid: "2g4s-2x8s-2xb6", name: "Game" }],
    sessions: [
      { uuid: "2cvs-658s-2126", name: "Lecture 12", date: "12/01/22" },
    ],
  },
  // FOLDERS
  "2g4s-2x8s-2xb6": {
    folders: [
      { uuid: "212x-228s-2xb6", name: "First Week" },
      { uuid: "2d2x-c28s-2df1", name: "Second week" },
    ],
    sessions: [],
  },
  "212x-228s-2xb6": {
    folders: [],
    sessions: [],
  },
  "2d2x-c28s-2df1": {
    folders: [],
    sessions: [],
  },
  // SESSIONS
  "2cvs-658s-2126": {
    bookmarks: {
      "04:32:12": {
        isNested: false,
        timestamp: "04:32:12",
        title: "Pay attention here",
        text: "lorem ipsum",
      },
    },
  },
};
