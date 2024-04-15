import React, { useState, useEffect, useRef } from "react";
import { json } from "react-router-dom";
import io from "socket.io-client"
import { IoSend } from "react-icons/io5";

const socket = io(import.meta.env.VITE_BACKEND_URL)


export function Chat({setRender}){
  const [message, setMessage] = useState("")
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
    fetch("https://websockets-chat-backend.onrender.com/api/getMessages", {headers:{
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

  const preHandleSubmit = (e) =>{
    e.preventDefault()
    if(message == ""){
      return 
    }else{
      handleSubmit(e)
    }
  }

  const handleChange = (e) =>{
    if(e.target.value == " "){
      e.target.value = ""
    }else{
      setMessage(e.target.value)
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const newMesagge = {
      data: message,
      user: user
    }
    setMesagges([...messages, newMesagge])
    socket.emit("message", newMesagge)

    fetch("https://websockets-chat-backend.onrender.com/api/saveMessages",{
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
    <main className="h-screen w-screen bg-[url('https://i.redd.it/6kjb54r4nzob1.jpg')] flex justify-center items-center">
      <button onClick={handleLogout} className="bg-red-500 fixed bottom-4 left-5 p-2 font-semibold rounded-md text-white hover:scale-125 transition-all">Logout</button>
      <div className="max-h-[80%]  min-h-[80%] flex bg-zinc-800 bg-opacity-90 flex-col w-[85%] m-auto shadow-black shadow-2xl rounded-xl justify-between">
        <ul ref={scrollableRef} className="overflow-y-scroll p-7 max-w-full flex flex-col max-h-[100%] min-h-[100%]">
          {
            messages.map(message => <h1 className={`text-white inlineinline-table	 mb-2 rounded-md md:text-xl text-md  p-2.5 break-words ${message.user === user ? "" : ""}`}> <span className={` ${message.user === user ? "text-blue-500 font-bold" : "text-red-500 font-bold"}`}>{message.user}: </span>{ message.data}</h1> )
          }
    
        </ul>
        <form action="" onSubmit={preHandleSubmit} className="m-4 rounded-md ">  
          <div className="flex gap-2 items-center">
            <input className="rounded-md w-full text-start p-2 bg bg-zinc-900 border-[0] focus:outline-[0]  transition-all text-white" onChange={handleChange} type="text" value={message} placeholder="Tu mensaje"/>
            <button><IoSend size={30} color="rgb(59 130 246)"/></button>  
          </div>
        </form>
      </div>
    </main>
  )
}

