import React from "react";
import { controlPageHeader_c } from "../../../../../constants/theme";
import { PageHeaderControls } from "../../file-system-page/file-system-controls/file-system-controls.styles";

const BookmarksControlsComponent = (props) => {
  return (
    <PageHeaderControls
      className="PageHeader"
      color={controlPageHeader_c}
    ></PageHeaderControls>
  );
};

export default BookmarksControlsComponent;
