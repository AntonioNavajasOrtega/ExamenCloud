import {useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import auth from './services/auth';
import api from './services/api';
import './App.css';
import axios from 'axios';
import Evento from './evento';

function App() {
  const [user, setUser] = useState({});
  const [logs, setLogs] = useState([]);

 async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject)
    localStorage.setItem("token", response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;

    try {
      const res = await axios.post('https://server-examen.vercel.app/auth/logged', {
          token: response.credential, 
        });

      console.log(res.data);
      const token = localStorage.getItem("token");
      await axios.post('https://server-examen.vercel.app/log', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      usuario: userObject.email,
      caducidad: userObject.exp,  // Suponiendo que 'exp' contiene la caducidad del token
      token: response.credential,
    });
    }
    catch(error){
      console.log("Error al enviar token al backend")
    }
  }

  async function handleProtectedApiCall() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get('https://server-examen.vercel.app/eventos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      console.log(res.data)
    } catch (error) {
      console.log("error al pedir las entidades")
    }
  }

  function handleSignOut(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    localStorage.removeItem("token")
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  async function handleShowLogs() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://server-examen.vercel.app/log', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Error al obtener los logs:', error);
    }
  }

  useEffect(() => {
    /* global google */
      google.accounts.id.initialize({
        client_id: "934310162741-e74bp9o07ua6kiit7kgeu0qfinljc8oh.apps.googleusercontent.com",
        callback: handleCallbackResponse
      })

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline", size: "large"}
      )

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const storedUser = jwtDecode(storedToken);
        setUser(storedUser)
      }
  }, []);


  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 && <button onClick={(e) => handleSignOut(e)}>Sign Out</button> }
     
      {user && 
      <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
          <button onClick={() => handleProtectedApiCall()}>Petición a ruta protegida</button>
          <Evento />
      </div>
      }

<button onClick={handleShowLogs}>Mostrar Logs</button>
      {logs.length > 0 && (
        <div>
          <h3>Logs</h3>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>
                {`Timestamp: ${log.timestamp}, Usuario: ${log.usuario}, Caducidad: ${log.caducidad}, Token: ${log.token}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
