import React from "react"
import { BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import Register from "./pages/register"
import NotFound from "./pages/not_found"
import ProtectedRoute from "./components/ProctectedRoute"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegsiterAndLogout(){
  localStorage.clear()
  return <Register/> 
}


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
          	<Home />
        	</ProtectedRoute>
        } />
			<Route path="/login" element={<Login />}/>
			<Route path="/logout" element={<Logout  />}/>
			<Route path="/register" element={<RegsiterAndLogout />}/>
			<Route path="*" element={<NotFound />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
