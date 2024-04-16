import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"

export function Login({setRender}){
    const [username, setUser] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const response = await fetch('https://websockets-chat-backend.onrender.com/api/login', {
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
          setIsLoading(false)
          setRender("NewRender")       
        }else{
          setIsLoading(false)
        }
    }

    return (
      <main className="bg-[url('https://i.redd.it/6kjb54r4nzob1.jpg')] bg-cover h-screen flex items-center justify-center">
        <form id="login-form" onSubmit={handleSubmit} className={`bg-zinc-800 bg-opacity-90 p-10 rounded-md shadow-2xl transition-all ${isLoading ? "skeleton" : ""}`}>
          <div className="mb-4">
            <input onChange={(e)=> setUser(e.target.value)} placeholder="Usuario" type="text" id="user" name="user" required className="p-2 rounded focus:outline-none"/>
          </div>
          <div>
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" id="password" name="password" required className="p-2 rounded focus:outline-none"/>
          </div>
          <button className="mt-7 bg-blue-600 text-white p-2 rounded-md w-full font-semibold shadow-md" type="submit">Iniciar sesión</button>
        </form>
      </main>
    )
}