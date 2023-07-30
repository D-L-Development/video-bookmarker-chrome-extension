import styled, { css } from "styled-components";
import { getHoverColor, getTextColor } from "../../constants/color-functions";
import { modalTypes } from "../../constants/theme";

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
  background-color: ${({ theme }) => theme.body_c};
  color: ${({ theme }) => getTextColor(theme.body_c)};
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
  background-color: ${({ theme, $modalType }) =>
    ({
      [modalTypes.FORM]: theme.primary_c,
      [modalTypes.WARNING]: theme.primary_c,
      [modalTypes.ALERT]: theme.error_c,
    }[$modalType] || theme.error_c)};
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
  margin-top: auto;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  display: flex;
  padding-inline: 1rem;
  padding-bottom: 1rem;
  gap: 0.5rem;
  justify-content: end;
  align-items: center;

  // if only one child button is present
  :has(> :nth-child(1):last-child) {
    justify-content: center;
  }
`;

export const ModalButton = styled.button`
  border: none;
  border-radius: 0.2rem;
  width: fit-content;
  min-width: 20%;
  padding: 0.5rem 0.3rem;
  cursor: pointer;
  color: white;
  transition: 150ms ease-in-out;
  font-size: 0.7rem;
  ${({ disabled, $btnType, theme }) => {
    if (disabled) {
      return (
        "background: transparent;" + "color: #e3e3e3;" + "cursor: default;"
      );
    } else if ($btnType === "cancel") {
      return `background: ${theme.modalColors.cancelBtn_c}`;
    } else {
      return `background: ${theme.modalColors.submitBtn_c}`;
    }
  }};

  &:hover {
    opacity: ${({ disabled }) => !disabled && "0.8"};
  }
`;

export const SecondaryInputText = styled.p`
  font-size: 0.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.error_c};

  // this makes it to where the p tag stays the same size when empty
  &:empty::before {
    content: "";
    display: inline-block;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalBody = styled.div`
  margin: 0.6rem 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ModalInput = styled.input`
  padding: 0.2rem 0.5rem;
  caret-color: black;
  font-size: 0.85rem;
  border-radius: 2px;
  transition: 150ms;
  font-family: inherit;
  background-color: inherit;

  ${({ theme, error }) => {
    const [textColor, borderColor] = getHoverColor(theme.body_c, [1, 0.2]);
    return css`
      color: ${textColor};
      border: 1px solid ${error ? theme.error_c : borderColor};

      &::placeholder {
        color: ${borderColor};
      }

      &:focus {
        outline: 1px solid ${error ? theme.error_c : borderColor};
        box-shadow: 0 0 3px 1px ${error ? theme.error_c : borderColor};
      }
    `;
  }}
`;

export const TextInput = styled(ModalInput).attrs((props) => ({
  type: "text",
}))``;

export const Label = styled.label`
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
  opacity: 0.8;
`;
