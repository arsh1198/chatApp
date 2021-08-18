import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Card from "./Card";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const ModalHeading = styled.div`
  font-family: "Roboto Mono", monospace;
  margin-bottom: 1em;
  font-weight: 800;
  font-size: 1.5rem;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0 0 0 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const ButtonsConatiner = styled.div`
  display: flex;
`;

const Modal = ({ heading, open, onClose, onSubmit, children }) => {
  if (!open) return null;

  return (
    <>
      <Overlay />
      <ModalContainer>
        <Card bg="#e2e2e2">
          <ModalHeading>{heading}</ModalHeading>
          <form onSubmit={onSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {children}
              <ButtonsConatiner>
                <Button elevated onClick={onClose}>
                  Close
                </Button>
                <Button elevated bg="tomato" type="submit">
                  Ok
                </Button>
              </ButtonsConatiner>
            </div>
          </form>
        </Card>
      </ModalContainer>
    </>
  );
};

export default Modal;
