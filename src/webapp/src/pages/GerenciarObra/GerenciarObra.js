import React, { useEffect, useState } from "react";
import { useUIContextController } from "../../context/index.js";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FaChevronLeft } from "react-icons/fa";
import Layout from "../../components/layout/Layout.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatarOrcamento, formatarData } from "../../components/utils/utilsMask.js";

const GerenciarObra = () => {
  const { id } = useParams();
  const [state] = useUIContextController();
  const { darkMode } = state;
  const navigate = useNavigate();
  const URL_API = process.env.REACT_APP_URL_API;
  const [loading, setLoading] = useState(false);
  const [obra, setObra] = useState({});
  const [modal, setModal] = useState(false);


  const [funcionarios, setFuncionarios] = useState([]);
  const [cliente, setCliente] = useState({});
  const [materiais, setMateriais] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);


  async function getObra() {
    axios
      .get(`${URL_API}/api/obras/obra?id=${id}`)
      .then((response) => {
        setObra(response.data);
        getClienteDaObra(response.data.clienteId);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async function getFuncionariosDaObra(obraId) {
    axios
      .get(`${URL_API}/api/funcionarios/buscaFuncionarioPorObra?obraId=${obraId}`)
      .then((response) => {
        setFuncionarios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async function getClienteDaObra(clienteId) {
    axios
      .get(`${URL_API}/api/clientes/cliente?id=${clienteId}`)
      .then((response) => {
        setCliente(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async function getMateriaisDaObra() { }
  async function getEquipamentosDaObra() { }


  useEffect(() => {
    setLoading(true);
    getObra()
      .then(() => {
        getFuncionariosDaObra(id);

      })
      .catch((error) => {
        console.error(error);
      }
      )
      .finally(() => {
        setLoading(false);
      }
      );
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Layout rotaAtual="Obras">
      <Container
        style={{
          marginTop: "2vh",
        }}
      >
        {/* Header */}
        <Row
          className="mb-3"
          style={{
            backgroundColor: darkMode ? "#414141" : "#FFFFFF",
            padding: "1rem 0.5rem 1rem 0.5rem",
            borderRadius: "0.5rem",
            boxShadow: darkMode
              ? "0px 0px 10px rgba(255, 255, 255, 0.1)"
              : "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {loading ? (
            <Skeleton height={40} width="100%" />
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Button
                    color="link"
                    onClick={() => navigate(-1)}
                    className="text-decoration-none"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: darkMode ? "#FFFFFF" : "#343A40",
                    }}
                  >
                    <FaChevronLeft />
                    {""} Voltar
                  </Button>
                </div>
                <div
                  className="d-flex justify-content-start align-items-center"
                  style={{
                    width: "50%",
                    color: darkMode ? "#FFFFFF" : "#343A40",
                    height: "100%",
                  }}
                >
                  <h4 style={{ margin: "0" }}>
                    {obra?.nome || "Nome da Obra"}
                  </h4>
                </div>
                <div
                  className="text-end"
                  style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                >
                  <Button
                    color="link"
                    style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                    className="text-decoration-none"
                  >
                    Equipamentos
                  </Button>
                  <Button
                    color="link"
                    style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                    className="text-decoration-none"
                  >
                    Funcionários
                  </Button>
                  <Button
                    color="link"
                    style={{ color: darkMode ? "#FFFFFF" : "#343A40" }}
                    className="text-decoration-none"
                  >
                    Materiais
                  </Button>
                </div>
              </div>
            </>
          )}
        </Row>
        <div
          style={{
            backgroundColor: darkMode ? "#414141" : "#FFFFFF",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: darkMode
              ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
              : "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {loading ? (
            <Skeleton height={40} width="100%" />
          ) : (
            <>
              <Row className="mb-2" noGutters>
                <Col xs={12} sm={6} md={6} className="mb-4">
                  <Card
                    style={{
                      backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                      margin: "0.5rem",
                      height: "100%",
                      borderRadius: "0.5rem",
                      boxShadow: darkMode
                        ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                        : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <CardBody>
                      <CardTitle
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          textAlign: "start",
                          borderBottom: darkMode
                            ? "1px solid rgba(255, 255, 255, 0.2)"
                            : "1px solid rgba(52, 58, 64, 0.2)",
                        }}
                      >
                        Informações gerais
                      </CardTitle>
                      <Row style={{ marginBottom: "0.5rem" }}>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Nome da Obra:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {obra.nome}
                          </CardText>
                        </Col>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Identificador:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {obra.identificador}
                          </CardText>
                        </Col>
                      </Row>

                      <Row style={{ marginBottom: "0.5rem" }}>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Endereço:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {obra.endereco}
                          </CardText>
                        </Col>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Data de Início:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {formatarData(obra.dataInicio)}
                          </CardText>
                        </Col>
                      </Row>

                      <Row style={{ marginBottom: "0.5rem" }}>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Data Final:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {obra.dataFinal ? formatarData(obra.dataFinal) : "Não informado"}
                          </CardText>
                        </Col>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Contrato:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {obra.contrato}
                          </CardText>
                        </Col>
                      </Row>

                      <Row style={{ marginBottom: "0.5rem" }}>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Alvará:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {obra.alvara}
                          </CardText>
                        </Col>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Orçamento:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {formatarOrcamento(obra.orcamento)}
                          </CardText>
                        </Col>
                      </Row>

                      <Row style={{ marginBottom: "0.5rem" }}>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Responsável:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {obra.responsavel}
                          </CardText>
                        </Col>
                        <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Status:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {obra.status}
                          </CardText>
                        </Col>
                      </Row>

                      <Row style={{ marginBottom: "0.5rem" }}>
                        <Col xs={4} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Última alteração:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {new Date(obra.updatedAt).toLocaleDateString()}
                          </CardText>
                        </Col>
                        <Col xs={4} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Data de cadastro:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            {formatarData(obra.createdAt)}
                          </CardText>
                        </Col>
                        <Col xs={4} style={{ display: "flex", flexDirection: "column" }}>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                            <strong>Contrato:</strong>
                          </CardText>
                          <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                            <button onClick={toggleModal} style={{ color: darkMode ? "#FFFFFF" : "#343A40", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                              Visualizar Contrato
                            </button>
                          </CardText>
                        </Col>
                      </Row>


                      <div style={{paddingTop: '1rem', borderTop: darkMode ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(52, 58, 64, 0.2)" }}>
                        <Row style={{ marginBottom: "0.5rem" }}>
                          <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                            <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                              <strong>Cliente:</strong>
                            </CardText>
                            <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                              {obra.cliente}
                            </CardText>
                          </Col>
                          <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                            <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                              <strong>Telefone:</strong>
                            </CardText>
                            <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                              {cliente.telefone}
                            </CardText>
                          </Col>
                          <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                            <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                              <strong>Email:</strong>
                            </CardText>
                            <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                              {cliente.email}
                            </CardText>
                          </Col>
                          <Col xs={6} style={{ display: "flex", flexDirection: "column" }}>
                            <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginBottom: 0 }}>
                              <strong>Endereço:</strong>
                            </CardText>
                            <CardText style={{ color: darkMode ? "#FFFFFF" : "#343A40", marginTop: 0 }}>
                              {cliente.endereco}
                            </CardText>
                          </Col>

                        </Row>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col xs={12} sm={6} md={6} className="mb-4">
                  <Card
                    style={{
                      backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                      margin: "0.5rem",
                      height: "100%",
                      borderRadius: "0.5rem",
                      boxShadow: darkMode
                        ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                        : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <CardBody>
                      <CardTitle
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          textAlign: "start",
                          borderBottom: darkMode
                            ? "1px solid rgba(255, 255, 255, 0.2)"
                            : "1px solid rgba(52, 58, 64, 0.2)",
                        }}
                      >
                        Andamento da Obra
                      </CardTitle>
                      <CardText
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          padding: "1rem 0rem 0.5rem 0rem",
                        }}
                      >
                        Conteúdo do Card 3
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row className="mb-4" noGutters>
                <Col xs={12} sm={6} md={6} className="mb-1">
                  <Card
                    style={{
                      backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                      margin: "0.5rem",
                      height: "100%",
                      borderRadius: "0.5rem",
                      boxShadow: darkMode
                        ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                        : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <CardBody>
                      <CardTitle
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          textAlign: "start",
                          borderBottom: darkMode
                            ? "1px solid rgba(255, 255, 255, 0.2)"
                            : "1px solid rgba(52, 58, 64, 0.2)",
                        }}
                      >
                        Equipamentos
                      </CardTitle>
                      <CardText
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          padding: "1rem 0rem 0.5rem 0rem",
                        }}
                      ></CardText>
                    </CardBody>
                  </Card>
                </Col>

                <Col xs={12} sm={6} md={6} className="mb-1">
                  <Card
                    style={{
                      backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                      margin: "0.5rem",
                      height: "100%",
                      borderRadius: "0.5rem",
                      boxShadow: darkMode
                        ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                        : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <CardBody>
                      <CardTitle
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          textAlign: "start",
                          borderBottom: darkMode
                            ? "1px solid rgba(255, 255, 255, 0.2)"
                            : "1px solid rgba(52, 58, 64, 0.2)",
                        }}
                      >
                        Materiais
                      </CardTitle>
                      <CardText
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          padding: "1rem 0rem 0.5rem 0rem",
                        }}
                      >
                        Conteúdo do Card 3
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={12} sm={12} md={12} className="mb-1">
                  <Card
                    style={{
                      backgroundColor: darkMode ? "#676767" : "#FFFFFF",
                      margin: "0.5rem",
                      height: "100%",
                      borderRadius: "0.5rem",
                      boxShadow: darkMode
                        ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                        : "0px 0px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <CardBody>
                      <CardTitle
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          textAlign: "start",
                          borderBottom: darkMode
                            ? "1px solid rgba(255, 255, 255, 0.2)"
                            : "1px solid rgba(52, 58, 64, 0.2)",
                        }}
                      >
                        Funcionários
                      </CardTitle>
                      <CardText
                        style={{
                          color: darkMode ? "#FFFFFF" : "#343A40",
                          padding: "1rem 0rem 0.5rem 0rem",
                        }}
                      ></CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </div>

        {/* Modal */}
        <Modal isOpen={modal} toggle={toggleModal} size="xl">
          <ModalHeader toggle={toggleModal}>Visualizar Contrato</ModalHeader>
          <ModalBody>
            {obra.urlContrato && (
              <iframe
                src={`${obra.urlContrato}`}
                style={{ width: "100%", height: "500px", border: "none" }}
                title="Contrato"
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color={darkMode ? "secondary" : "primary"}
              onClick={() => window.open(obra.urlContrato, "_blank")}
            >
              Baixar Contrato
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </Layout>
  );
};

export default GerenciarObra;
