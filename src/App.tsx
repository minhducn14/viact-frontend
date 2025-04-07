import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import './App.css'
import AppRouter from './routes/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" />
    </>
  )
}

export default App
