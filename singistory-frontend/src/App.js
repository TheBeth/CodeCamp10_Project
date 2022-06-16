import React, { useContext, useEffect } from "react";
import RouteConfig from "./routes/RouteConfig";
import { ErrorContext } from "./context/ErrorContext";
import { Snackbar } from "@mui/material"
import { useState } from "react"
import { Alert } from "@mui/material";
import { AuthContext } from "./context/AuthContext";
import { FinishContext } from "./context/FinishContext";


function App() {
  const [showMessage, setShowMessage] = useState();
  const [showLogin, setShowLogin] = useState();
  const [showFinish, setShowFinish] = useState();


  const { error, setError } = useContext(ErrorContext)
  const { errorLogin, setErrorLogin } = useContext(AuthContext)
  const { finish, setFinish } = useContext(FinishContext)

  useEffect(() => {
    if (errorLogin) {
      setShowLogin(true);
    }
  }, [errorLogin]);
  useEffect(() => {
    if (error) {
      setShowMessage(true);
    }
  }, [error]);
  useEffect(() => {
    if (error) {
      setShowFinish(true);
    }
  }, [finish]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowLogin(false);
    setShowMessage(false);
    setError('')
    setErrorLogin('')
    setFinish('')
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
        open={showLogin}
      // message={error}  **if don't have alert can use this line
      >
        <Alert onClose={handleClose} severity="error">
          {errorLogin}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
        open={showMessage}
      // message={error}  **if don't have alert can use this line
      >
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
        open={showFinish}
      // message={error}  **if don't have alert can use this line
      >
        <Alert onClose={handleClose} severity="success">
          {finish}
        </Alert>
      </Snackbar>

      


      <RouteConfig />
    </>
  );
}

export default App;
