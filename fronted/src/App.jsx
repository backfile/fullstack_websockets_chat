
import React, { useState, useEffect } from "react";
import io from "socket.io-client"


const socket = io(import.meta.env.VITE_BACKEND_URL)




function App(){
  const [message, setMessage] = useState()
  const [messages, setMesagges] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3000/getMessages").then(data => data.json()).then(dataJson => {
    const listOfMessages = []
    dataJson.forEach(msg => {
      listOfMessages.push(msg)
      
    });
    console.log(listOfMessages)
    setMesagges(listOfMessages)
  })
  }, [])
  

  const handleSubmit = (e) =>{
    e.preventDefault()
    const newMesagge = {
      data: message,
      from: "Me"
    }
    setMesagges([...messages, newMesagge])
    socket.emit("message", message)
    setMessage("")
  }

  socket.on("message", (data) => {
    setMesagges([... messages, data])
  })

  return(
    <div className="h-screen flex justify-center items-center bg-zinc-800">
      <form action="" onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-md">
        <div className="flex gap-2 justify-center mb-10">
          <input className="text-center rounded-md" onChange={e => setMessage(e.target.value)} type="text" value={message} placeholder="Tu mensaje"/>
          <button className="bg-blue-300 p-1 rounded-md">Send</button>
        </div>
        <ul>
          {
            messages.map(message => <li className={`text-white  my-2 rounded-md text-sm table p-2 ${message.from === "Me" ? "bg-blue-500" : "bg-black ml-auto"}`}> <span className="text-gray-800">{message.from}:</span>{ message.data}</li> )
          }
        </ul>
      </form>
    </div>
  )
}

export default App