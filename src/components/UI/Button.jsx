import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 0;
  border: 1px solid black;
  padding: 0.65em 2.25em;
  box-shadow: 2px 2px black;
  font-family: "Roboto Mono", monospace;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  font-weight: 800;
  cursor: pointer;
  transition: ease all 100ms;
  &:active {
    box-shadow: -2px -2px black;
  }
`;

export default Button;