import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button as MuiButton,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Layout from "../../components/layout/Layout.js";
import { useUIContextController } from "../../context/index.js";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import { Input, Spinner } from "reactstrap";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { formatarTelefone } from "components/utils/utilsMask.js";
import ConfirmacaoModal from "components/utils/ConfirmacaoModal.js";

const Perfil = () => {
  const [loadingUser, setLoadingUser] = useState(false);
  const [state] = useUIContextController();
  const { userId, darkMode } = state;
  const [user, setUser] = useState({});
  const [telefoneEdit, setTelefoneEdit] = useState("");
  const [nivelUsuario, setNivelUsuario] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingFoto, setLoadingFoto] = useState(false);
  const [loadingSenha, setLoadingSenha] = useState(false);
  const [confirmation, setconfirmation] = useState({
    state: false,
    message: "",
  });
  const [deleteFoto, setDeleteFoto] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmacaoModal, setConfirmacaoModal] = useState({
    state: false,
    messagem: "",
    sucesso: false,
  });

  const [userFoto, setUserFoto] = useState(
    "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
  );

  const URL_API = process.env.REACT_APP_URL_API;

  const getPerfil = async () => {
    axios
      .get(`${URL_API}/api/users/usuario?email=${userId}`)
      .then((response) => {
        setUser(response.data);
        setNivelUsuario(parseInt(response.data.nivelUsuario));
        setTelefoneEdit(response.data.telefone);

        if (response.data.foto !== null) {
          setUserFoto(response.data.urlFoto);
        } else {
          setUserFoto(
            "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
          );
        }
      })
      .catch((error) => {
        setConfirmacaoModal({
          state: true,
          messagem: "Erro ao buscar dados do perfil!",
          sucesso: false,
        });
        setLoadingUser(false);
        console.log(error);
      });
  };

  useEffect(() => {
    setLoadingUser(true);
    getPerfil();

    setInterval(() => {
      setLoadingUser(false);
    }, 2000);
  }, []);

  const cardStyle = {
    height: "100%",
    backgroundColor: darkMode ? "#676767" : "#f0f0f0",
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const textStyle = {
    color: darkMode ? "#FFFFFF" : "#343A40",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#676767" : "#CECFCB",
    color: darkMode ? "#FFFFFF" : "#343A40",
    border: "none", // Remover a borda do botão
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#676767" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: darkMode ? "1px solid #FFFFFF" : "1px solid #ced4da",
  };
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkMode ? "#6E6E6E" : "#FFFFFF",
    color: darkMode ? "#FFFFFF" : "#000000",
    border: "none",
  };

  const cancelButtonStyle = {
    backgroundColor: "#FF4747",
    color: "#FFFFFF",
    border: "none",
  };

  const checkboxStyle = {
    backgroundColor: darkMode ? "#4A4A4A" : "#7A7A7A",
    borderColor: darkMode ? "#FFFFFF" : "#7A7A7A",
  };

  const updateUser = () => {
    setLoading(true);
    user.telefone = telefoneEdit;
    axios
      .put(`${URL_API}/api/users/alterarUsuario?id=${user.id}`, user)
      .then((response) => {
        setUser(response.data);
        setconfirmation({
          state: true,
          message: "Usuário atualizado com sucesso!",
        });
      })
      .catch((error) => {
        console.log(error);
        setconfirmation({
          state: true,
          message: "Erro ao atualizar usuário!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(fileType)) {
        setFileError(
          "Somente arquivos de imagem são permitidos (jpg, jpeg, png)."
        );
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        setFileError("O tamanho do arquivo não pode exceder 2MB.");
        return;
      }
      setFileError("");
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    setLoadingFoto(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("imagem", selectedFile);

      try {
        const response = await axios.post(
          `${URL_API}/api/users/editPhoto?email=${user.email}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Atualizar a foto na tela
        setUserFoto(response.data.photoUrl);
        setOpen(false);
        setFileError("");
        setLoadingFoto(false);
      } catch (error) {
        setFileError("Falha ao enviar o arquivo. Tente novamente.");
        setLoadingFoto(false);
      }
    } else {
      setFileError("Selecione um arquivo para enviar.");
      setLoadingFoto(false);
    }
  };

  const sendNewSenha = () => {
    setLoadingSenha(true);
    if (novaSenha === "") {
      setconfirmation({
        state: true,
        message: "A senha não pode ser vazia!",
      });
      setLoadingSenha(false);
      return;
    } else {
      axios
        .put(
          `${URL_API}/api/resetSenha`,
          {
            email: user.email,
            password: novaSenha,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setconfirmation({
            state: true,
            message:
              "Senha alterada com sucesso! Sua nova senha foi enviada para seu e-mail!",
          });
        })
        .catch((error) => {
          setconfirmation({
            state: true,
            message: "Erro ao alterar senha!",
          });
        })
        .finally(() => {
          setLoadingSenha(false);
        });
    }
  };

  const extrairNomeFoto = (url) => {
    try {
      // Extrair a parte da URL após o último '/'
      const partesUrl = url.split("/");
      const ultimaParte = partesUrl[partesUrl.length - 1];

      // Remover a parte da query string após o '?'
      const nomeFoto = ultimaParte.split("?")[0];

      return nomeFoto;
    } catch (error) {
      console.error("Erro ao extrair o nome da foto:", error.message);
      return null;
    }
  };
  const removePhoto = async () => {
    const nomeFoto = await extrairNomeFoto(userFoto);
    try {
      const response = await axios.delete(
        `${URL_API}/api/users/removePhoto`,
        {
          params: {
            email: user.email,
            photoName: nomeFoto,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Foto removida com sucesso");
        setUserFoto(
          "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
        );
      } else {
        console.log("Erro ao remover a foto:", response.data.error);
      }
    } catch (error) {
      console.error("Erro ao remover a foto:", error.message);
    }
  };

  return (
    <Layout rotaAtual="Obras">
      {!loadingUser ? (
        <Container style={{ marginTop: "3vh" }}>
          <Row>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    boxShadow: darkMode
                      ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                      : "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ marginBottom: "10px", ...textStyle }}
                    >
                      Foto
                    </Typography>
                    <Box>
                      <IconButton
                        style={textStyle}
                        onClick={() => setOpen(true)}
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        style={textStyle}
                        onClick={() => {
                          setDeleteFoto(true);
                        }}
                      >
                        <FaTrash />
                      </IconButton>
                    </Box>
                  </Box>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginTop: "10px",
                      border: darkMode
                        ? "2px solid #FFFFFF"
                        : "2px solid #ced4da",
                    }}
                  >
                    <img
                      src={
                        userFoto ||
                        "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    boxShadow: darkMode
                      ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                      : "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      ...textStyle,
                    }}
                  >
                    Informações Pessoais
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" style={textStyle}>
                      Nome:{" "}
                      <span style={{ fontWeight: "lighter" }}>{user.nome}</span>
                    </Typography>
                    <Typography variant="h6" style={textStyle}>
                      Email:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {user.email}
                      </span>
                    </Typography>
                    <Typography variant="h6" style={textStyle}>
                      Cargo:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {user.cargo}
                      </span>
                    </Typography>
                    <Typography variant="h6" style={textStyle}>
                      Tipo:{" "}
                      <span style={{ fontWeight: "lighter" }}>{user.tipo}</span>
                    </Typography>
                    <Typography variant="h6" style={textStyle}>
                      Telefone:{" "}
                      <span style={{ fontWeight: "lighter" }}>
                        {formatarTelefone(user.telefone)}
                      </span>
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent
                  style={{
                    alignItems: "center",
                    height: "100%",
                    boxShadow: darkMode
                      ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                      : "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      ...textStyle,
                    }}
                  >
                    Alterar Senha
                  </Typography>
                  <Form.Group>
                    <Form.Label
                      className="col-sm-2 col-form-label col-form-label-sm"
                      style={textStyle}
                    >
                      E-mail
                    </Form.Label>
                    <FormControl
                      type="text"
                      value={user.email}
                      readOnly
                      style={inputStyle}
                    />
                  </Form.Group>
                  <Form.Group
                    style={{ marginTop: "10px", position: "relative" }}
                  >
                    <Form.Label
                      className="col-sm col-form-label col-form-label-sm"
                      style={textStyle}
                    >
                      Nova Senha *
                    </Form.Label>
                    <Form.Group
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <FormControl
                        type={showPassword ? "text" : "password"}
                        style={{ ...inputStyle, flex: 1 }}
                        onChange={(e) => {
                          setNovaSenha(e.target.value);
                        }}
                      />
                      <IconButton
                        style={{
                          marginLeft: "10px",
                          color: darkMode ? "#FFFFFF" : "#000000",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </Form.Group>
                  </Form.Group>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: darkMode ? "#313131" : "#CECFCB",
                        color: darkMode ? "#FFFFFF" : "#343A40",
                        border: "none",
                      }}
                      onClick={() => {
                        sendNewSenha();
                      }}
                    >
                      {loadingSenha ? (
                        <Spinner color="light" size={"sm"} />
                      ) : (
                        "Alterar"
                      )}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent
                  style={{
                    alignItems: "center",
                    height: "100%",
                    boxShadow: darkMode
                      ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                      : "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Form.Group>
                    <Form.Label style={textStyle}>E-mail</Form.Label>
                    <FormControl
                      type="text"
                      value={user.email}
                      readOnly
                      style={inputStyle}
                    />
                  </Form.Group>
                  <Form.Group style={{ marginTop: "10px" }}>
                    <Form.Label style={textStyle}>Telefone</Form.Label>
                    <FormControl
                      type="text"
                      value={formatarTelefone(telefoneEdit)}
                      style={inputStyle}
                      onChange={(e) => {
                        setTelefoneEdit(e.target.value);
                      }}
                    />
                  </Form.Group>
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    boxShadow: darkMode
                      ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                      : "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      ...textStyle,
                    }}
                  >
                    Status do Perfil
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.status === "Ativo" ? true : false}
                      />
                    }
                    label={user.status === "Ativo" ? "Ativo" : "Inativo"}
                    style={textStyle}
                  />
                </CardContent>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={cardStyle}>
                <CardContent
                  style={{
                    alignItems: "center",
                    height: "100%",
                    boxShadow: darkMode
                      ? "0px 0px 10px rgba(255, 255, 255, 0.2)"
                      : "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      marginBottom: "10px",
                      ...textStyle,
                    }}
                  >
                    Nível do Usuário
                  </Typography>
                  <FormControlLabel
                    control={
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="tipoUsuario"
                        id="tipoUsuario"
                        checked={nivelUsuario === 1 ? true : false}
                        disabled
                        style={nivelUsuario === 1 ? checkboxStyle : {}}
                      />
                    }
                    label="Administrador"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      ...textStyle,
                    }}
                  />
                  <FormControlLabel
                    control={
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="tipoUsuario"
                        id="tipoUsuario"
                        checked={nivelUsuario === 2 ? true : false}
                        disabled
                        style={nivelUsuario === 2 ? checkboxStyle : {}}
                      />
                    }
                    label="Comum"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                      ...textStyle,
                    }}
                  />
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="primary"
              style={{
                ...buttonStyle,
                marginBottom: "10px",
              }}
              onClick={() => {
                updateUser();
              }}
            >
              {loading ? <Spinner color="light" size={"sm"} /> : "Salvar"}
            </Button>
          </Box>
        </Container>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            marginTop: "4vh",
            height: "100vh",
          }}
        >
          <Spinner color={darkMode ? "light" : "secondary"} />
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={modalStyle}>Upload de Foto</DialogTitle>
        <DialogContent style={modalStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {fileError && (
              <div style={{ justifyContent: "center", textAlign: "center" }}>
                <Typography color="error" style={{ marginTop: "10px" }}>
                  {fileError}
                </Typography>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions style={modalStyle}>
          <MuiButton
            onClick={() => {
              setOpen(false);
              setFileError("");
            }}
            style={cancelButtonStyle}
          >
            Cancelar
          </MuiButton>
          <MuiButton onClick={handleUpload} style={buttonStyle}>
            {loadingFoto ? <Spinner color="light" size={"sm"} /> : "Enviar"}
          </MuiButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmation.state}
        onClose={() =>
          setconfirmation({
            state: false,
            message: "",
          })
        }
      >
        <DialogTitle style={modalStyle}>Confirmação!</DialogTitle>
        <DialogContent style={modalStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ justifyContent: "center", textAlign: "center" }}>
              <Typography style={{ marginTop: "10px" }}>
                {confirmation.message}
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions style={modalStyle}>
          <MuiButton
            onClick={() => {
              setconfirmation({
                state: false,
                message: "",
              });
            }}
            style={{
              backgroundColor: darkMode ? "#313131" : "#CECFCB",
              color: darkMode ? "#FFFFFF" : "#343A40",
              border: "none",
            }}
          >
            Confirmar
          </MuiButton>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteFoto} onClose={() => setDeleteFoto(false)}>
        <DialogTitle style={modalStyle}>Atenção!</DialogTitle>
        <DialogContent style={modalStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ justifyContent: "center", textAlign: "center" }}>
              <Typography style={{ marginTop: "10px" }}>
                Deseja realmente remover a foto?
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions style={modalStyle}>
          <MuiButton
            onClick={() => {
              setDeleteFoto(false);
            }}
            style={{
              backgroundColor: darkMode ? "#313131" : "#CECFCB",
              color: darkMode ? "#FFFFFF" : "#343A40",
              border: "none",
            }}
          >
            Cancelar
          </MuiButton>
          <MuiButton
            onClick={() => {
              removePhoto();
              setDeleteFoto(false);
            }}
            style={{
              backgroundColor: "#FF4747",
              color: "#FFFFFF",
              border: "none",
            }}
          >
            Excluir
          </MuiButton>
        </DialogActions>
      </Dialog>

      <ConfirmacaoModal
        open={confirmacaoModal.state}
        onClose={() =>
          setConfirmacaoModal({
            state: false,
            messagem: "",
            sucesso: false,
          })
        }
        mensagem={confirmacaoModal.messagem}
        sucesso={confirmacaoModal.sucesso}
      />
    </Layout>
  );
};

export default Perfil;
