import React, { useState, useEffect, useRef } from "react";
import { json } from "react-router-dom";
import io from "socket.io-client"

const socket = io(import.meta.env.VITE_BACKEND_URL)


export function Chat({setRender}){
  const [message, setMessage] = useState()
  const [messages, setMesagges] = useState([])
  const scrollableRef = useRef(null);
  


  const user = localStorage.getItem("username")
  const token = localStorage.getItem("token")


  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [scrollableRef.current]);

  useEffect(()=>{
    fetch("http://localhost:3000/api/getMessages", {headers:{
      "authorization" : token
    }}).then(data => data.json()).then(dataJson => {
    const listOfMessages = []
    console.log(dataJson, "datajson")
    dataJson.forEach(msg => {
      listOfMessages.push(msg)
      
    });
    setMesagges(listOfMessages)
  })
  }, [])
  
  const handleLogout = () =>{
    localStorage.removeItem("token")
    setRender("")
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const newMesagge = {
      data: message,
      user: user
    }
    setMesagges([...messages, newMesagge])
    socket.emit("message", newMesagge)

    fetch("http://localhost:3000/api/saveMessages",{
      method: "POST",
      body: JSON.stringify({data: message, user: user}),
      headers:{
        authorization: token,
        'Content-Type': 'application/json'
      }
    })

    
  }

  socket.on("message", (data) => {
    setMesagges([... messages, data])
  })

  return(
    <div className="h-screen flex justify-center items-center bg-zinc-800 ">
      <button onClick={handleLogout}>Logout</button>
      <form action="" onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-md ">
        <div className="flex gap-2 justify-center mb-10">
          <input className="text-center rounded-md" onChange={e => setMessage(e.target.value)} type="text" value={message} placeholder="Tu mensaje"/>
          <button className="bg-blue-300 p-1 rounded-md">Send</button>
        </div>
        <ul ref={scrollableRef} className="h-[200px] overflow-y-scroll">
          {
            messages.map(message => <li className={`text-white  mb-2 rounded-md text-sm table p-2 ${message.user === user ? "bg-blue-500" : "bg-black ml-auto"}`}> <span className="text-gray-800">{message.user}:</span>{ message.data}</li> )
          }
        </ul>
      </form>
    </div>
  )
}

