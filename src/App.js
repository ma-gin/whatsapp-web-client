import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage.jsx"
import Welcome from "./components/Welcome.js"
import "./styles/sidebar.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/homepage" exact element={<Homepage />} />
      </Routes>
    </Router>
  )
}
