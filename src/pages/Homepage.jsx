import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from 'react-bootstrap/Button'

export default function Homepage() {
    return (
        <React.Fragment>
            <Navbar />
            <Button>
                Register
            </Button>
            <Button>
                Log in pls
            </Button>
            <Footer />
        </React.Fragment>
    )
}

