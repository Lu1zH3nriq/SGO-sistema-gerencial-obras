import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
} from "react-bootstrap";

const DateSelectionModal = ({
  show,
  onHide,
  darkMode,
  dataInicial,
  setDataInicial,
  dataFinal,
  setDataFinal,
  handleModalClose,
  setModalDatasOpen,
  inputStyle,
  buttonStyle,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <ModalHeader
        closeButton
        style={{
          backgroundColor: darkMode ? "#676767" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#343A40",
          border: "none",
        }}
      >
        Selecionar Datas
      </ModalHeader>
      <ModalBody
        style={{
          backgroundColor: darkMode ? "#676767" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#343A40",
          border: "none",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <Typography
            variant="subtitle1"
            style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
          >
            Data Inicial:
          </Typography>
          <FormControl
            type="date"
            className="me-2"
            style={inputStyle}
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <Typography
            variant="subtitle1"
            style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
          >
            Data Término:
          </Typography>
          <FormControl
            type="date"
            className="me-2"
            style={inputStyle}
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter
        style={{
          backgroundColor: darkMode ? "#676767" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#343A40",
          border: "none",
        }}
      >
        <Button
          variant="secondary"
          onClick={handleModalClose}
          style={buttonStyle}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => setModalDatasOpen(false)}
          style={{
            backgroundColor: darkMode ? "#4CAF50" : "#007BFF",
            color: "#FFFFFF",
            border: "none",
          }}
        >
          Pesquisar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DateSelectionModal;
