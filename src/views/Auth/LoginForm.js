import React, { useState, useEffect } from 'react'
import { Grid} from '@mui/material'
import {useForm, Form} from '../../components/useForm'
import Controls from '../../components/actions/Controls'
import {makeStyles} from '@mui/styles'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import Popup from "../../components/Popup";
import RegisterForm from "./RegisterForm"
import NavBar from "../../components/NavBar"


    
const useStyles = makeStyles(theme =>({ 
    loginButton: {
        background: 'linear-gradient(45deg, #00ff00 30%, #9aff5c 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        height: 48,
        width: 350,
        left: 100
      },
      googleButton: {
        //background: 'linear-gradient(45deg, #00ff00 30%, #9aff5c 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        height: 48,
        width: 350,
        left: 100,
        top: 10,
        icon: GoogleIcon
      },
      textbox: {
        left: 93,
        width: 200,
        length: 200,
        size: 100,
      },
      signup: {
          left: 100,
          width: 350,
          top: 300,
          size: 200
      }
    
}))
const initalFValues = {
    id: 0,
    email: '',
    password: '',
    rememberMe: ''

}
export default function LoginForm() {
    const [openRegisterPopup, setOpenRegisterPopup] = useState(false)
    const [openLoginPopup, setOpenLoginPopup] = useState(false)


    const validate=(fieldValues = values)=>{
        let temp = {...errors}
        if ('email' in fieldValues)
            temp.email = (/.+@.+../).test(fieldValues.email)?"":"Email is not valid."
        if ('password' in fieldValues)
            temp.password = fieldValues.password?"":"This field is required."
        
        setErrors({
            ...temp
        })
        
        if (fieldValues === values)
        return Object.values(temp).every(x => x === "")

    }
    
    const classes = useStyles();
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initalFValues, true, validate);

    
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const auth = getAuth(); 

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate()) {
            var userEmail = values.email
            var userPassword = values.password
            const auth = getAuth();
            signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                window.alert("Welcome, " + userEmail)
                resetForm();
                setOpenLoginPopup(false)
                
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert(errorMessage + ": " + errorCode)
            });
           
        }  
       
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
                
              //TODO: add successful login page that looks good
            } else {
              // User is signed out
              // ...
            }
          });
    }
    
        const handleRegisterClick = () => {
            setOpenRegisterPopup(true)
            NavBar.closePopup();
        }

    //TODO: functionalize remember me switch
    return (
            <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs = {6}>
                    <Controls.Input
                    label = "Email"
                    name="email"
                    value={values.email}
                    onChange = {handleInputChange}
                    error={errors.email}
                    className={classes.textbox}
                    fullWidth = {false}
                    style = {{width: '350px'}}
                    required
                    />
                    <Controls.Input 
                    label = "Password"
                    name="password"
                    type = "password"
                    value={values.password}
                    onChange = {handleInputChange}
                    error={errors.password}
                    className={classes.textbox}
                    style = {{width: '350px'}}
                    required
                    />
                <Controls.Button
                className = {classes.signup}                
                variant = "text"
                size = "small"
                text = "Don't have an account? Sign up here!"
                
                onClick={handleRegisterClick}
                />
                
                {/* <Controls.Checkbox 
                    className={classes.checkbox}
                    label="Remember Me"
                    checked="defaultUnchecked"
                    //onChange = {handleInputChange}

                /> */}
                <Controls.Button 
                className = {classes.loginButton}
                variant = "contained"
                color = "secondary"
                size = "large"
                text = "Login"
                type="login"
                onClick = {() => setOpenLoginPopup(false)}
                />
                <Controls.Button 
                className = {classes.googleButton}
                variant = "outlined"
                color = "primary"
                size = "large"
                text = "Login with Google"
                type="google login"
                onClick ={handleGoogleLogin}
                />
                <Popup 
                    title = "Register"
                    openPopup={openRegisterPopup}
                    setOpenPopup={setOpenRegisterPopup}>
                    <RegisterForm/>
                </Popup>
                <Popup 
                    title = "Login"
                    openPopup={openLoginPopup}
                    setOpenPopup={setOpenLoginPopup}>
                    <LoginForm/>
                </Popup>
                </Grid>
                

            </Grid>
            
            </Form>
            
            
    )
}