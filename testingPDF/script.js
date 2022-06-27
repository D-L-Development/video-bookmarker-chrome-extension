pdfMake.vfs = vfs;
const downloadBtnElem = document.querySelector("#saveFile");

const dd = {
  content: [
    "First paragraph",
    "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
  ],
};

downloadBtnElem.addEventListener("click", () => {
  pdfMake.createPdf(dd).download();
});
