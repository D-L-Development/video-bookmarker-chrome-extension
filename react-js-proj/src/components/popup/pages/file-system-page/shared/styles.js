import styled from "styled-components";

const DIMEN_PERCENT = "33.3333%";

export const Square = styled.div`
  width: ${DIMEN_PERCENT};
  padding-bottom: ${DIMEN_PERCENT};
  position: relative;
  outline: 1px solid white;
`;

export const StretchContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const SessionNameText = styled.span`
  position: absolute;
  bottom: 3%;
  font-size: 0.7rem;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;
