import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import "../styles/welcome.css"

export default function Welcome() {
  const [view, setView] = useState(true)

  const changeView = () => {
    setView(!view)
  }
  return (
    <div className="welcome">
      <h1>WhatsApp Web</h1>
      {view ? <Login register={changeView} /> : <Register login={changeView} />}
      <p>Requires the latest version of WhatsApp</p>
    </div>
  )
}

function Login({ register }) {
  return (
    <div className="login">
      <h3>Login</h3>
      <p className="view-change">
        {`Not registered? `}
        <span className="view-link" onClick={register}>
          {`Sign up here`}
        </span>
      </p>
      <Form>
        <Form.Group controlId="login" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control size="md" placeholder="Enter Username" />
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            size="md"
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Button className="mt-4" variant="success">
          Log In
        </Button>
      </Form>
    </div>
  )
}

function Register({ login }) {
  return (
    <div className="register">
      <h3>Sign Up</h3>
      <p className="view-change view-link" onClick={login}>
        Log In?
      </p>
      <Form>
        <Form.Group controlId="login" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control size="md" placeholder="Enter Username" />
          <Form.Label className="mt-3" type="password">
            Password
          </Form.Label>
          <Form.Control size="md" placeholder="Enter Password" />
          {/* <Form.Label>First Name</Form.Label>
          <Form.Control size="md" placeholder="Enter First Name" />
          <Form.Label className="mt-2">Last Name</Form.Label>
          <Form.Control size="md" placeholder="Enter Last Name" /> */}
          <Form.Label className="mt-3">Email Address</Form.Label>
          <Form.Control
            size="md"
            type="email"
            placeholder="Enter Email Address"
          />
        </Form.Group>
        <Button className="mt-4" variant="success">
          Sign Up
        </Button>
      </Form>
    </div>
  )
}
