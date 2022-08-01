import React from "react";
import { controlPageHeader_c } from "../../../../../constants/theme";
import { PageHeaderControls } from "../../page.styles";

const BookmarksControlsComponent = (props) => {
  return (
    <PageHeaderControls
      className="PageHeader"
      color={controlPageHeader_c}
    ></PageHeaderControls>
  );
};

export default BookmarksControlsComponent;
