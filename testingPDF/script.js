pdfMake.vfs = vfs;
const downloadBtnElem = document.querySelector("#saveFile");

const dd = {
  content: [
    {
      table: {
        headerRows: 1,
        widths: [50, 50, "*"],
        body: [
          // header format
          [
            {
              text: "Session Name",
              colSpan: 3,
              fontSize: 18,
              alignment: "center",
            },
            "",
            "",
          ],
          // bookmark format
          [
            { text: "00:56:08", bold: true },
            { text: "First title goes here of course", colSpan: 2, bold: true },
            "",
          ],
          [
            {
              text: "More information can be found here. So the description of each bookmark goes here. There should be a limit on how long this text should be.",
              colSpan: 3,
            },
            "",
            "",
          ],
          // nested bookmark format
          [
            {},
            { text: "00:56:08", bold: true },
            { text: "First title goes here of course", bold: true },
          ],
          [
            {},
            {
              text: "More information can be found here. So the description of each bookmark goes here. There should be a limit on how long this text should be.",
              colSpan: 2,
            },
            {},
          ],
        ],
      },
    },
  ],
};

downloadBtnElem.addEventListener("click", () => {
  pdfMake.createPdf(dd).download();
});
