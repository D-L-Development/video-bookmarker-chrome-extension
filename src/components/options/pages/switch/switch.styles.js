import styled from "styled-components";

export const StyledSwitch = styled.div`
  width: ${(props) => props.width || "2rem"};
  display: flex;
`;

export const HiddenCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  :checked + label {
    background-color: #bada55;
  }

  :checked + label:after {
    left: calc(100% - 3%);
    transform: translateX(-100%);
  }
`;

export const SwitchLabel = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  background: grey;
  display: block;
  border-radius: 100px;
  height: 0;
  width: 100%;
  padding-bottom: 50%;
  position: relative;

  :after {
    content: "";
    position: absolute;
    top: 5%;
    left: 3%;
    width: 45%;
    height: 90%;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  :active:after {
    width: 60%;
  }
`;
