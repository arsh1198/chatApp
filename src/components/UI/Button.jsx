import React from "react";
import styled from "styled-components";

const FlatButton = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 0;
  border: 1px solid black;
  padding: 0.65em 2.25em;
  font-family: "Roboto Mono", monospace;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  font-weight: 800;
  cursor: pointer;
`;

const ElevatedButton = styled.button`
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
    transform: translate(2px, 2px);
  }
`;

const Button = ({ elevated, ...rest }) => {
  return elevated ? <ElevatedButton {...rest} /> : <FlatButton {...rest} />;
};

export default Button;
