import React, {useState, useEffect} from 'react'
import Controls from "../components/actions/Controls";
import Popup from "./Popup";
import { createTheme, ThemeProvider } from '@mui/material';
import LoginForm from '../views/Auth/LoginForm'
import { getAuth, onAuthStateChanged } from "firebase/auth";


function NavBar() {

  const [openLoginPopup, setOpenLoginPopup] = useState(false)
   const [loginButtonName, setLoginButtonName] = useState(["Log In"])

  // //changes button when user is logged in
  // const onLogin = async () => {
  //   await onAuthStateChanged(getAuth(), (user) => {
  //     setLoginButtonName( "Logged In, " + user?.displayName) 
  //   });
  // }
  // onLogin()

  const handleLoginButton = () => {
    setOpenLoginPopup(true)
  }
    return (
      <div className="App">
        <div className="Elements">
        <a href="home">Zippyprints</a>
        <a href="about">Upload</a>
        <a href="discover">Map</a>
        </div>

        <div className="Auth">
          <a href ="Auth" className="Login">{loginButtonName}</a>
          <a href ="Auth2" className="Register">Register</a>
        </div>
        <ThemeProvider theme = {color}>
        <Controls.Button
        text = "Login"
        variant = "contained"
        size = "large"
        color = "white"
        onClick = {handleLoginButton}>
        
      </Controls.Button>
      </ThemeProvider>
      <Popup 
        title = "Login"
        openPopup={openLoginPopup}
        setOpenPopup={setOpenLoginPopup}>
        <LoginForm/>
      </Popup>
      </div>
    
    );
  }
  const color = createTheme({
    palette: {
      white: {
        main: '#FFFFFF',
      },
      red: {
        main: ''
      },
    },
  });
  
export default NavBar;