import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({setRender}){
    const [username, setUser] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username, password: password })
        });
        const data = await response.json();
        console.log(data, "data")
        const token = data["token"]
        const user = data["user"]
        if(token){
          localStorage.setItem("token", token)
          localStorage.setItem("username", user)
          setRender("NewRender")       
        }else{
          console.log("No existe")
        }
    }

    return (
      
      <form id="login-form" onSubmit={handleSubmit}>
        <div>
          <label for="user">Usuario:</label>
          <input onChange={(e)=> setUser(e.target.value)} type="text" id="user" name="user" required/>
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required/>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    )
}