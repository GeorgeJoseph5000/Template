import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import { auth } from '../../firebase'
import { Labels } from '../../lang/Labels'
import { LangContext } from '../../App'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function NavigationBar() {

    const { userPackage } = useContext(UserContext)
    const { lang } = useContext(LangContext)

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Link className="navbar-brand" to="/">{Labels["title"][lang]}</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/about" className="nav-link">About</Link>
                            
                        </Nav>
                        <Nav>

                            {userPackage != null ? (
                                <>
                                    <Link to="/profile" className="nav-link">{userPackage.data.firstname}'s Profile</Link>
                                    <a href="#" onClick={() => {auth.signOut()}} className="nav-link">Logout</a>
                                </>
                            ) : (
                                <>
                                    <Link to="/register" className="nav-link">Register</Link>
                                    <Link to="/login" className="nav-link">Login</Link>
                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}
