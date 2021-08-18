import styled from "styled-components";

const Input = styled.input`
  border-radius: 0px;
  min-height: 2.5em;
  padding: 0.65em 1.25em;
  border: 1px solid black;
  font-family: "Roboto Mono", monospace;
  font-weight: 800;
  &:active {
    border-radius: 0px;
    outline: none;
  }
`;
export default Input;
