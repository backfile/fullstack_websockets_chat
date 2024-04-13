import React, { useState, useEffect, useRef } from "react";
import { json } from "react-router-dom";
import io from "socket.io-client"
import { IoSend } from "react-icons/io5";

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
  }, [scrollableRef.current, messages]);

  useEffect(()=>{
    fetch("http://localhost:3000/api/getMessages", {headers:{
      "authorization" : token
    }}).then(data => data.json()).then(dataJson => {
    const listOfMessages = []
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
    setMessage("")
    
  }

  socket.on("message", (data) => {
    setMesagges([... messages, data])
  })

  return(
    <div className="h-screen flex bg-zinc-800 flex-col px-[10%]">
      <button onClick={handleLogout}>Logout</button>
        <ul ref={scrollableRef} className="a overflow-y-scroll p-5 h-full">
          {
            messages.map(message => <li className={`text-white  mb-2 rounded-md text-xl table p-2.5 ${message.user === user ? "bg-blue-500" : "bg-slate-700 ml-auto"}`}> <span className="text-black font-semibold ">{message.user}:</span>{ message.data}</li> )
          }
        </ul>
      <form action="" onSubmit={handleSubmit} className="m-4 rounded-md ">  
        <div className="flex gap-2  items-center">
          <input className="rounded-md w-full text-start p-2" onChange={e => setMessage(e.target.value)} type="text" value={message} placeholder="Tu mensaje"/>
          <button><IoSend size={30} color="rgb(59 130 246)"/></button>  
        </div>
      </form>
    </div>
  )
}

