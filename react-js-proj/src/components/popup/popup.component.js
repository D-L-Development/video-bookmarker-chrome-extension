import React, { useContext, useRef, useState } from "react";
import CloseIcon from "../../icons/close-icon/close.icon";
import { MSG, sendMessageToActiveTab } from "../../contentScripts/utility";
import {
  CloseIconWrapper,
  Footer,
  Header,
  StyledMainHeader,
  StyledPopup,
} from "./popup.styles";
import ViewPagerComponent from "./view-pager/view-pager.component";
import { ModalContext } from "../../contexts/modal.context";
import { fsDispatchContext } from "../../contexts/file-system.context";
import { OutsideContext } from "../../contexts/outside-context";
import FileSystemControlsComponent from "./pages/file-system-page/file-system-controls/file-system-controls.component";
import { PageHeader } from "./view-pager/view-pager.styles";
import PathComponent from "./pages/file-system-page/path/path.component";
import InputComponent from "./shared/input/input.component";

const PopupComponent = () => {
  const { setModalProps, show, hide } = useContext(ModalContext);
  const fsDispatch = useContext(fsDispatchContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNum, setPageNum] = useState("first");

  const containerRef = useRef(null);
  const handleCloseIconClick = (e) => {
    sendMessageToActiveTab({ action: MSG.TOGGLE }, (response) => {
      if (response.status !== MSG.SUCCESS) {
        alert("Failed to close side menu");
      }
    });
  };

  return (
    <StyledPopup ref={containerRef}>
      {/* Context provider to detect clicks outside of a context menu */}
      <OutsideContext.Provider value={containerRef}>
        <Header>
          <StyledMainHeader></StyledMainHeader>
          <CloseIconWrapper onClick={handleCloseIconClick}>
            <CloseIcon width="24px" height="24px" color="white" />
          </CloseIconWrapper>
        </Header>
        <FileSystemControlsComponent />
        <PageHeader className="PageHeader">
          <PathComponent />
          <InputComponent
            placeholder="Search files..."
            marginRight={"0.5rem"}
            marginLeft={"auto"}
            setQuery={setSearchQuery}
          />
        </PageHeader>
        <ViewPagerComponent searchQuery={searchQuery} pageNum={pageNum} />
        <Footer></Footer>
        {/* TODO: remove this button */}
        <button
          onClick={() => setPageNum(pageNum === "first" ? "second" : "first")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5,
          }}
        >
          Toggle
        </button>
      </OutsideContext.Provider>
    </StyledPopup>
  );
};

export default PopupComponent;
