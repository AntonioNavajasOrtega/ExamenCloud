import {useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import auth from './services/auth';
import api from './services/api';
import './App.css';
import axios from 'axios';
import Evento from './evento';
import CloudinaryUploader from './CloudinaryUploader';
import ListaPagos from './ListaPagos';
import FormularioPago from './FormularioPago';

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
    }
    catch(error){
      console.log("Error al enviar token al backend")
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
      const response = await axios.get('https://server-examen.vercel.app/logs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const sortedLogs = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setLogs(sortedLogs);
      
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
      {localStorage.getItem("token") == null && <p>Por favor inicie sesión</p>}
      {user && 
      <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
          {localStorage.getItem("token") != null && <ListaPagos userEmail={user.email} />}
          {localStorage.getItem("token") != null && <FormularioPago userEmail={user.email}/>}
      </div>
      }


    </div>
  );
}

export default App;
