import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Welcome from "./components/Welcome"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
      </Routes>
    </Router>
  )
}
