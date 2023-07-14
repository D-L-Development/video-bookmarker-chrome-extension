import styled from "styled-components";
import { main_c, primary_c } from "../../colors";

export const Main = styled.div`
  background: ${primary_c};
  padding-block: 1rem;
`;

export const HeaderText = styled.h1`
  font-size: 5rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
`;

export const HeaderSecondary = styled.p`
  font-size: 2rem;
  color: ${main_c};
  text-align: center;
`;

export const Features = styled.div`
  height: 20rem;
  display: flex;
  justify-content: space-around;
  padding-block: 2rem;
  background-color: ${({ color }) => color};
`;

export const FeatureSection = styled.div`
  flex-basis: 23%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  outline: 1px solid grey;
`;

export const FeatureText = styled.span`
  font-size: 1rem;
  padding: 1rem;
  text-align: center;
`;

export const ListSection = styled(Features)`
  justify-content: space-between;
  align-items: center;
`;

export const List = styled.ul`
  height: fit-content;
  font-size: 1.2rem;
  padding-left: 3rem;
  line-height: 2.5rem;
`;
