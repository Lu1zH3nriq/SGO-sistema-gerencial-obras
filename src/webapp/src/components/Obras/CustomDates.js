import React, { useState } from "react";
import { Typography } from "@mui/material";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
} from "react-bootstrap";
import { Col } from "react-bootstrap";

const DateSelectionModal = ({ show, onHide, darkMode, setCustomDates }) => {
  const [dataInicial, setDataInicial] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dataFinal, setDataFinal] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");
  const [tipeSelectFilterDate, setTipeSelectFilterDate] = useState("Data de Início");

  const handleModalClose = () => {
    setDataInicial("");
    setDataFinal("");
    setError("");
    onHide();
  };

  const handleSendCustomDates = () => {
    if (dataInicial === "" || dataFinal === "") {
      setError("Por favor, preencha as datas.");
    } else {
      setError("");
      setCustomDates(dataInicial, dataFinal, tipeSelectFilterDate);
      handleModalClose();
    }
  };


  const checkboxStyle = {
    backgroundColor: darkMode ? "#4A4A4A" : "#7A7A7A",
    borderColor: darkMode ? "#FFFFFF" : "#7A7A7A",
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <ModalHeader
        closeButton
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#000000",
          borderBottom: darkMode
            ? "1px solid rgba(255, 255, 255, 0.2)"
            : "1px solid rgba(52, 58, 64, 0.2)",
        }}
      >
        Selecionar Datas
      </ModalHeader>
      <ModalBody
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#000000",
          border: "none",
        }}
      >
        <Col md={12} style={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem 0rem 2rem 0rem",
        }} >
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="dataInicio"
              id="dataInicio"
              checked={tipeSelectFilterDate === "Data de Início"}
              onChange={() => {
                setTipeSelectFilterDate("Data de Início");
              }}
              style={ tipeSelectFilterDate === "Data de Início"? checkboxStyle : {}}
            />
            <label
              className="form-check-label"
              htmlFor="clienteFisico"
              style={{ color: darkMode ? "#FFFFFF" : "#000000" }}
            >
              Data de Início
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="dataFinal"
              id="dataFinal"
              checked={tipeSelectFilterDate === "Data de Término"}
              onChange={() => {
                setTipeSelectFilterDate("Data de Término");
              }}
              style={ tipeSelectFilterDate === "Data de Término" ? checkboxStyle : {}}
            />
            <label
              className="form-check-label"
              htmlFor="clienteJuridico"
              style={{ color: darkMode ? "#FFFFFF" : "#000000" }}
            >
              Data de Término
            </label>
          </div>
        </Col>
        <div style={{ paddingBottom: '1rem' }}>
          <Typography
            variant="subtitle1"
            style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
          >
            Data Inicial:
          </Typography>
          <FormControl
            type="date"
            className="me-2"
            style={{
              backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
              color: darkMode ? "#FFFFFF" : "#000000",
              marginBottom: "10px",
            }}
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
        </div>
        <div style={{}}>
          <Typography
            variant="subtitle1"
            style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
          >
            Data Término:
          </Typography>
          <FormControl
            type="date"
            className="me-2"
            style={{
              backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
              color: darkMode ? "#FFFFFF" : "#000000",
              marginBottom: "10px",
            }}
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>
        {error && (
          <small
            style={{
              color: "red",
              fontSize: "11px",
            }}
          >
            * {error}
          </small>
        )}
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
          style={{
            backgroundColor: darkMode ? "#424242" : "#CECFCB",
            color: darkMode ? "#FFFFFF" : "#343A40",
            border: "none",
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSendCustomDates();
          }}
          style={{
            backgroundColor: "#1BD760",
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
