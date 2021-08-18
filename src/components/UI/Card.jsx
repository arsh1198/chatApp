import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  border: 1px solid black;
  padding: 2.25em 2.25em;
  font-family: "Roboto Mono", monospace;
  background: ${({ bg }) => bg};
  font-weight: 800;
`;

export default Card;
