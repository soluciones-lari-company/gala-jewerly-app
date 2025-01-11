import './App.css'
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext'
import Routes from './routing/Routes'

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App