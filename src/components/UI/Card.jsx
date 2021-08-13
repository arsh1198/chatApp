import React from "react";
import styled from "styled-components";

const Card = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 0;
  border: 1px solid black;
  padding: 0.65em 2.25em;
  font-family: "Roboto Mono", monospace;
  background: ${({ color }) => color};
  font-weight: 800;
  cursor: pointer;
  transition: ease all 100ms;
`;

export default Card;
