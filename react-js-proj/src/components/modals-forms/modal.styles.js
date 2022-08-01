import styled from "styled-components";
import {
  error_c,
  inputGlow_c,
  inputOutline_c,
  modalColors as colors,
} from "../../constants/theme";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  display: flex;
  z-index: 20;
`;

export const StyledModal = styled.div`
  width: 350px;
  height: fit-content;
  background-color: white;
  margin: auto;
  border-radius: 2rem 2rem 5px 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 35px 11px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

export const ModalHeader = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    colors.typeColors[props.$modalType] || colors.typeColors.alert};
`;

export const CloseIconWrapper = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  display: flex;
  height: 100%;
`;

export const ModalTitle = styled.span`
  margin-left: 1rem;
  color: white;
`;

export const ModalBodyText = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem;
  text-align: center;
`;

export const ModalActionButtons = styled.div`
  height: 2.5rem;
  margin-top: auto;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 0.5px solid rgb(249, 231, 231);
`;

export const ModalButton = styled.button`
  border: none;
  border-radius: 0.2rem;
  height: 60%;
  width: fit-content;
  min-width: 20%;
  padding-inline: 0.3rem;
  cursor: pointer;
  color: white;
  transition: 0.1s ease-in-out;
  font-size: 0.7rem;
  ${(props) => {
    if (props.disabled) {
      return (
        "background: transparent;" + "color: #e3e3e3;" + "cursor: default;"
      );
    } else if (props.$btnType === "cancel") {
      return `background: ${colors.cancelBtn_c}`;
    } else {
      return `background: ${colors.submitBtn_c}`;
    }
  }};

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? ""
        : props.$btnType === "cancel"
        ? colors.cancelBtnHover_c
        : colors.submitBtnHover_c};
  }
`;

export const ModalBody = styled.div`
  margin: 0.6rem 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextInput = styled.input.attrs((props) => ({
  type: "text",
}))`
  outline: ${(props) => (props.error ? error_c : "none")};
  padding: 0.2rem 0.2rem;
  caret-color: black;
  font-size: 0.6rem;
  border-radius: 2px;
  border: 1px solid gray;
  transition: 0.1s;
  font-family: "Roboto", sans-serif;

  &::placeholder {
    color: lightgray;
    font-size: 0.6rem;
  }

  &:focus {
    outline: 0.5px solid ${inputOutline_c};
    box-shadow: 0 0 5px 1px ${(props) => (props.error ? error_c : inputGlow_c)};
  }
`;

export const Label = styled.label`
  font-size: 0.75rem;
  margin-bottom: 0.2rem;
`;

export const SecondaryInputText = styled.p`
  font-size: 0.6rem;
  color: ${error_c};

  // this makes it to where the p tag stays the same size when empty
  &:empty::before {
    content: "";
    display: inline-block;
  }
`;
