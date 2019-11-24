import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";



import{SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData} from './redux/actions/userActions';



import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import Typography from "@material-ui/core/Typography";
import jwtDecode from "jwt-decode";

import AuthRoute from "./utils/AuthRoute";

// Pages:
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import upload from "./pages/upload";
import profile from "./pages/profile";

//Components:
import Navbar from "./components/navbar";
import axios from "axios";

const font = "'Source Sans Pro', sans-serif";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2E2E3A",
      dark: "#202028",
      light: "#575761"
    },
    secondary: {
      main: "#6F6F8C",
      dark: "#4d4d62",
      light: "#8b8ba3"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: font
  }
});


const token = localStorage.FBIdToken;
let UIauth;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser())
    UIauth = false;
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    
    axios.defaults.headers.common['Authorization'] = token;

    store.dispatch(getUserData());
    UIauth = true;

  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login}  />
              <AuthRoute exact path="/signup" component={signup}  />
              <Route exact path="/upload" component={upload} />
              <Route exact path="/user" component={profile} />
              //
            </Switch>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export { UIauth }; 
export default App;
