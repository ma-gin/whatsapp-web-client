import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Welcome from "./components/Welcome"

export default function App() {
  const [access, setAccess] = useState(false)
  useEffect(() => {
    checkCookie()
  }, [])

  const checkCookie = () => {
    if (document.cookie) setAccess(true)
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={(access && <Homepage />) || (!access && <Welcome />)}
        />
      </Routes>
    </Router>
  )
}
