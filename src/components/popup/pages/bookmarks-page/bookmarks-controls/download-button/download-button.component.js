import React, { useContext } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import SaveArrowIcon from "../../../../../../icons/save-arrow-icon/save-arrow.icon";
import { ActionIconWrapper } from "../../../page.styles";
import { defaultIconDimen } from "../bookmarks-controls.component";
import { BookmarksContext } from "../../../../../../contexts/bookmarks.context";
import { FileSystemContext } from "../../../../../../contexts/file-system.context";
import { useTheme } from "styled-components";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getBookmarksDocDef = (fileName, bookmarks) => {
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
        alignment: "center",
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
        alignment: "center",
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

  const { body } = dd.content[0].table;

  body[0][0].text = fileName;
  let counter = 0;
  for (let timestamp in bookmarks) {
    const { isNested, title, text } = bookmarks[timestamp];
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

const DownloadButtonComponent = (props) => {
  const { isLoading, bookmarks } = useContext(BookmarksContext);
  const fs = useContext(FileSystemContext);
  const theme = useTheme();

  const anyBookmarks = Object.keys(bookmarks).length >= 1;

  const handleDownloadIconClick = (e) => {
    if (isLoading || fs.isLoading) return;

    if (anyBookmarks) {
      const fileName = fs.history.at(-1).name || "new-annotation-file";
      const dd = getBookmarksDocDef(fileName, bookmarks);
      pdfMake.createPdf(dd).download(fileName);
    }
  };

  return (
    <ActionIconWrapper
      onClick={handleDownloadIconClick}
      enabled={anyBookmarks}
      title="Download"
      disabled={!anyBookmarks}
      disableColorChangeDelay={true}
      parentColor={theme.pageControls_c}
    >
      <SaveArrowIcon
        {...defaultIconDimen}
        color={anyBookmarks ? "white" : "grey"}
      />
    </ActionIconWrapper>
  );
};

export default DownloadButtonComponent;
