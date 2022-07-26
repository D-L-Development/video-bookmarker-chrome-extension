import styled from "styled-components";

const DIMEN_PERCENT = "22.5%";
const MARGIN_PERCENT = "2%";

export const Square = styled.div`
  width: ${DIMEN_PERCENT};
  padding-bottom: ${DIMEN_PERCENT};
  margin-left: ${MARGIN_PERCENT};
  margin-top: ${MARGIN_PERCENT};
  position: relative;
  ${(props) =>
    props.selected &&
    `outline: 1px solid #0300ff;
    background-color: rgb(191, 181, 209);
  `}
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
  bottom: 6%;
  font-size: 0.7rem;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;
