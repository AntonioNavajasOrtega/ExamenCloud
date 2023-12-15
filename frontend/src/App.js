import {useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import auth from './services/auth';
import api from './services/api';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({});

 async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject)
    localStorage.setItem("token", response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;

    try {
      const res = await axios.post('http://localhost:5000/auth/logged', {
          token: response.credential, 
        });

      console.log(res.data);
    }
    catch(error){
      console.log("Error al enviar token al backend")
    }
  }

  async function handleProtectedApiCall() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get('http://localhost:5000/modelo1', {
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
      </div>
      }
    </div>
  );
}

export default App;
