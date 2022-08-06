import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import SaveArrowIcon from "../../../../../../icons/save-arrow-icon/save-arrow.icon";
import { ActionIconWrapper } from "../../../page.styles";
import { defaultIconDimen } from "../bookmarks-controls.component";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DownloadButtonComponent = (props) => {
  const handleDownloadIconClick = (e) => {
    console.log("DOWNLOAD");
  };
  return (
    <ActionIconWrapper
      onClick={handleDownloadIconClick}
      enabled={true}
      title="Download"
    >
      <SaveArrowIcon {...defaultIconDimen} color={"white"} />
    </ActionIconWrapper>
  );
};

export default DownloadButtonComponent;
