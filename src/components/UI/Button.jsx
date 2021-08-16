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

  &:active {
    box-shadow: 0px 0px black;
    transform: translateX(2px) translateY(2px);
  }
`;

export default Button;
