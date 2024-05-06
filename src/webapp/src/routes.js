import Login from "./pages/Login.js";
import ResetPass from "./pages/ResetPass.js";
import Dashboard from "./pages/Dashboard.js";
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Login",
    key: "Login",
    route: "/authentication/login",
    component: <Login />,
  },
  {
    type: "collapse",
    name: "Reset Password",
    key: "resetPassword",
    route: "/authentication/resetPassword",
    component: <ResetPass />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "admin/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "comum/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
