import styled from "styled-components";
import { getHoverColor } from "../../../../../constants/color-functions";

export const ViewModeSwitch = styled.div`
  display: flex;
  outline: ${({ theme }) => `1px solid ${getHoverColor(theme.pageControls_c)}`};
  border-radius: 0.2rem;
  margin-left: auto;
  margin-right: 0.5rem;
`;
