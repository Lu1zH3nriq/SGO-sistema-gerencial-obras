import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

const UIContext = createContext();
UIContext.displayName = "UIContext";
function reducer(state, action) {
  switch (action.type) {
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "USERTYPE": {
      return { ...state, userType: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function UIContextControllerProvider({ children }) {
  const initialState = {
    darkMode: false,
    userType: "Comum",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

function useUIContextController() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}
UIContextControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const setUserType = (dispatch, value) => dispatch({ type: "USERTYPE", value });

export {
  UIContextControllerProvider,
  useUIContextController,
  setLayout,
  setDarkMode,
  setUserType,
};