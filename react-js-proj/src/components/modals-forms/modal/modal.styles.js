import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  display: flex;
`;

export const StyledModal = styled.div`
  width: 350px;
  height: fit-content;
  background-color: white;
  margin: auto;
  border-radius: 5px;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 35px 11px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

export const ModalHeader = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  color: red;
  background-color: rgb(231, 67, 67);
`;

export const CloseIconWrapper = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  display: flex;
  height: 100%;
`;

export const ModalTitle = styled.span`
  margin-left: 1rem;
`;

export const ModalBodyText = styled.div`
  font-size: 0.8rem;
  margin: 0.5rem 0;
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
  width: 20%;
  cursor: pointer;
  color: white;
  transition: 0.1s ease-in-out;
  font-size: 0.7rem;
`;
