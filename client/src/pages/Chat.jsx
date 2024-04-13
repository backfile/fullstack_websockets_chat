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
    <main className="h-screen bg-[url('https://i.redd.it/6kjb54r4nzob1.jpg')] flex justify-center items-center">
      <button onClick={handleLogout} className="bg-red-500 fixed bottom-4 left-5 p-2 font-semibold rounded-md text-white hover:scale-125 transition-all">Logout</button>
      <div className="max-h-[80%] flex bg-zinc-800 bg-opacity-90 flex-col w-[85%] m-auto shadow-black shadow-2xl rounded-xl ">
        <ul ref={scrollableRef} className="overflow-y-scroll p-7 max-h-full">
          {
            messages.map(message => <li className={`text-white  mb-2 rounded-md text-xl table p-2.5  ${message.user === user ? "bg-blue-500" : "bg-black ml-auto"}`}> <span className="text-zinc-800 font-semibold ">{message.user}:</span>{ message.data}</li> )
          }
        </ul>
        <form action="" onSubmit={handleSubmit} className="m-4 rounded-md ">  
          <div className="flex gap-2  items-center">
            <input className="rounded-md w-full text-start p-2 bg bg-zinc-900 border-[0] focus:outline-[0]  transition-all text-white" onChange={e => setMessage(e.target.value)} type="text" value={message} placeholder="Tu mensaje"/>
            <button><IoSend size={30} color="rgb(59 130 246)"/></button>  
          </div>
        </form>
      </div>
    </main>
  )
}

