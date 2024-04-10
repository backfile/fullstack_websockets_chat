import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Chat } from "./pages/Chat"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute canActivate={false}/>}>
          <Route path='/chat' element={<Chat/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App