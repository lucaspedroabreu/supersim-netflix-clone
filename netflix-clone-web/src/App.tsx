import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import { Login } from "./pages/Login"
import { auth } from "../firebase"
import { useEffect } from "react"


const queryClient = new QueryClient()

function App() {
  const loggedUser = auth.currentUser

  useEffect(() => {
    console.log(loggedUser)
  }, [loggedUser, auth])

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {
          !loggedUser ? 
          <Login /> :
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
        }
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
