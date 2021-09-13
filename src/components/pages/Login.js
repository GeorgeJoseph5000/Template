import React, { useState, useContext } from 'react'
import { auth, db } from '../../firebase'
import { useHistory } from "react-router-dom"
import { UserContext } from '../../App'
import GoogleButton from 'react-google-button'
import firebase from "firebase";
import Loading from '../ui/Loading'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory()

    const { userPackage } = useContext(UserContext)

    if(userPackage != null){
        history.push("/")
        return <Loading/>
    }

    const login = (e) => {
        e.preventDefault()

        if(email == "" || password == ""){
            toast.error("Fill out all fields")
            return ""
        }

        auth.signInWithEmailAndPassword(email, password)
        .then((authUser) => {
            history.push("/")
        })
        .catch((error) => {
            toast.error(error.message)
        })
    }

    const loginWithGoogle = (e) => {
        var provider = new firebase.default.auth.GoogleAuthProvider()
        
        auth.signInWithPopup(provider).then((authUser) => {
            db.collection("users").doc(authUser.uid).get().then((doc) => {
                if(!doc.exists){
                    history.push("/completeregister")
                }
                
            })
        })
        .catch((error) => {
            toast.error(error.message)
            console.log(error)
        })
    }

    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col md={4}></Col>
                <Col lg={4} md={12} sm={12} style={{textAlign: "center"}}>
                    <br/>
                    <h2>Login</h2>
                    <br/>
                    <Form onSubmit={login}>
                        <Form.Control required type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                        <br />
                        <Form.Control required type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
                        <br/>
                        <Button type="submit">Login</Button>
                        <br/>
                        <br/>
                        <div className="googlesignin">
                            <GoogleButton className="center" onClick={loginWithGoogle} />
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
