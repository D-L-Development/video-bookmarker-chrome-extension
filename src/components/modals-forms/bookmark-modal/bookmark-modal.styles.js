import styled from "styled-components";
import { ModalInput } from "../modal.styles";

export const TextArea = styled(ModalInput).attrs(() => ({
  as: "textarea",
}))`
  resize: vertical;
  max-height: 200px;
  min-height: 50px;
`;
