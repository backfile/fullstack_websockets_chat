import React, { useState, useEffect } from "react";
import io from "socket.io-client"

const socket = io("http://localhost:3000")




function App(){
  const [message, setMessage] = useState()
  const [messages, setMesagges] = useState([])


  const handleSubmit = (e) =>{
    e.preventDefault()
    socket.emit("message", message)
  }

  socket.on("message", (data) => {
    setMesagges([... messages, data])

  })

  return(
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input onChange={e => setMessage(e.target.value)} type="text" placeholder="Msg"/>
        <button>Sendddd</button>
        <ul>
          {
            messages.map(message => <li>{message}</li> )
          }
        </ul>
      </form>
    </div>
  )
}

export default App