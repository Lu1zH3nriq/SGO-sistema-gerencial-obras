import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { useUIContextController, setDarkMode } from "../../context/index.js";
import { FaSun, FaMoon, FaToggleOff, FaToggleOn, FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import { useNavigate } from "react-router-dom";
import LogoutModal from "components/logout/LogoutModal.js";

export default function PermanentDrawerLeft({ rotaAtual }) {
  let navigate = useNavigate();
  const [controller, dispatch] = useUIContextController();
  const { darkMode } = controller;

  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleAlterTheme = () => {
    setDarkMode(dispatch, !darkMode);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "85%" }}
        style={{
          borderRadius: 0,
          margin: 0,
          backgroundColor: darkMode ? "#414141" : "#D9D9D6",
          height: "9%",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {rotaAtual}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: 2, cursor: "pointer" }}
              onClick={handleAlterTheme}
              title="Alterar tema"
            >
              {darkMode ? (
                <>
                  {" "}
                  <FaToggleOn size={20} /> <FaSun size={20} />{" "}
                </>
              ) : (
                <>
                  {" "}
                  <FaToggleOff size={20} /> <FaMoon size={20} />{" "}
                </>
              )}
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: 2 }}
              style={{ cursor: "pointer" }}
            >
              <FaUser
                size={20}
                title="Perfil"
                onClick={() => {
                  navigate("/perfil");
                }}
              />
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                setShowLogoutModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <CiLogout size={20} title="Sair" />
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List>
          <ListItem button>
            <ListItemText
              primary="dark-theme"
              onClick={handleAlterTheme}
              style={{ color: !darkMode ? "#344767" : "white" }}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="profile"
              style={{ color: !darkMode ? "#344767" : "white" }}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="logout"
              style={{ color: !darkMode ? "#344767" : "white" }}
            />
          </ListItem>
        </List>
      </Drawer>
      {showLogoutModal && (
        <LogoutModal
          visible={showLogoutModal}
          setVisible={() => {
            setShowLogoutModal(false);
          }}
        />
      )}
    </Box>
  );
}
