pdfMake.vfs = vfs;
const downloadBtnElem = document.querySelector("#saveFile");

const getBookmarksDocDef = (session) => {
  // nested bookmark format
  const m_nestedBookmarkHeaderStamp = [
    { text: "", border: [true, false, false, false] },
    { text: "00:56:08", style: "nestedBookmarkHeaderStamp" },
    {
      text: "First title goes here of course",
      style: "nestedBookmarkHeader",
    },
  ];
  // set the forth item in the border array to true if the nested
  // bookmark is the last item. (adds a border at the bottom of the cell)
  const m_nestedBookmarkText = [
    { text: "", border: [true, false, false, false] },
    {
      text: "More information can be found here. So the description of each bookmark goes here. There should be a limit on how long this text should be.",
      colSpan: 2,
      style: "bookmarkText",
    },
    {},
  ];

  const m_bookmarkHeaderStamp = [
    { text: "00:56:08", style: "bookmarkHeaderStamp" },
    {
      text: "First title goes here of course",
      colSpan: 2,
      style: "bookmarkHeader",
    },
    {},
  ];
  const m_bookmarkText = [
    {
      text: "More information can be found here. So the description of each bookmark goes here. There should be a limit on how long this text should be.",
      colSpan: 3,
      style: "bookmarkText",
    },
    "",
    "",
  ];

  const dd = {
    pageSize: "LETTER",
    content: [
      {
        table: {
          headerRows: 1,
          widths: [50, 50, "*"],
          body: [
            // header format
            [{ text: "Session Name", style: "mainHeader", colSpan: 3 }, {}, {}],
            // bookmarks go here
          ],
        },
      },
    ],
    styles: {
      mainHeader: {
        fontSize: 18,
        alignment: "center",
        margin: [0, 10, 0, 10],
        bold: true,
      },
      bookmarkHeaderStamp: {
        bold: true,
        fillColor: "#808776",
        margin: [0, 4, 0, 4],
        aligment: "center",
      },
      bookmarkHeader: {
        bold: true,
        fillColor: "#808776",
        margin: [0, 4, 0, 4],
      },
      nestedBookmarkHeaderStamp: {
        bold: true,
        fillColor: "#a2a69c",
        margin: [0, 4, 0, 4],
        aligment: "center",
      },
      nestedBookmarkHeader: {
        bold: true,
        fillColor: "#a2a69c",
        margin: [0, 4, 0, 4],
      },
      bookmarkText: {
        margin: [0, 4, 0, 4],
      },
    },
  };

  const { bookmarks, sessionName } = session;
  const { body } = dd.content[0].table;

  body[0][0].text = sessionName;
  let counter = 0;
  for (let bookmark in bookmarks) {
    const { isNested, title, text, timestamp } = bookmarks[bookmark];
    let bookmarkHeader = null;
    let bookmarkText = null;

    if (isNested) {
      bookmarkHeader = structuredClone(m_nestedBookmarkHeaderStamp);
      bookmarkHeader[0].text = "";
      bookmarkHeader[1].text = timestamp;
      bookmarkHeader[2].text = title;

      bookmarkText = structuredClone(m_nestedBookmarkText);
      // set border bottom to false, unless the nested bookmark
      // is the last one
      bookmarkText[0].border[3] = counter === Object.keys(bookmarks).length - 1;
      bookmarkText[0].text = "";
      bookmarkText[1].text = text;
      bookmarkText[2] = {};
    } else {
      bookmarkHeader = structuredClone(m_bookmarkHeaderStamp);
      bookmarkHeader[0].text = timestamp;
      bookmarkHeader[1].text = title;
      bookmarkHeader[2] = {};

      bookmarkText = structuredClone(m_bookmarkText);
      bookmarkText[0].text = text;
      bookmarkText[1] = {};
      bookmarkText[2] = {};
    }

    body.push(bookmarkHeader);
    body.push(bookmarkText);

    counter++;
  }
  return dd;
};

const dumbData = {
  bookmarks: {
    "45:32:22": {
      isNested: false,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "45:22:22": {
      isNested: true,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "45:22:42": {
      isNested: true,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "45:55:42": {
      isNested: false,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "45:32:48": {
      isNested: true,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "65:32:42": {
      isNested: true,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "05:55:42": {
      isNested: false,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "05:25:42": {
      isNested: false,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "45:22:42": {
      isNested: true,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "45:22:72": {
      isNested: true,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "65:12:72": {
      isNested: true,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "05:05:92": {
      isNested: false,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "05:15:62": {
      isNested: false,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
    "43:52:12": {
      isNested: true,
      title: "This is a title",
      text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      timestamp: "45:32:22",
    },
  },
  sessionName: "Lecture Title",
};

downloadBtnElem.addEventListener("click", () => {
  const dd = getBookmarksDocDef(dumbData);

  pdfMake.createPdf(dd).download("newVariation");
});
