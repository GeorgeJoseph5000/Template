import React, { useState, useContext } from 'react'
import { auth, db } from '../../firebase'
import { useHistory } from "react-router-dom"
import { UserContext } from '../../App'
import Loading from '../ui/Loading'
import { ToastContainer, toast } from 'react-toastify';
import { Col, Container, Form, Row, Button } from 'react-bootstrap'

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [work, setWork] = useState("")
    const [country, setCountry] = useState("")
    let history = useHistory()

    const { userPackage } = useContext(UserContext)

    if(userPackage != null){
        history.push("/")
        return <Loading/>
    }


    const register = (e) => {
        e.preventDefault()

        if(email == "" || password == "" || firstname == "" || lastname == "" || work == "" || country == ""){
            toast.error("Fill out all fields")
            return ""
        }


        db.collection("users").where("email", "==", email)
        .get().then((snapshot)=>{
            if(!snapshot.empty){
            }else{
                auth.createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    db.collection("users").doc(authUser.user.uid).set({
                        id: authUser.user.uid,
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        work: work,
                        country: country,
                        profile_pic: "https://img2.thejournal.ie/inline/1881369/original/?width=630&version=1881369",
                        cover_pic: "https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2880x1800-1455.jpg"
                    }).then(
                        history.push("/")
                    )
                })
                .catch((error) => {
                    toast.error(error.message)
                })
            }
        })
        
    }

    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col md={4}></Col>
                <Col lg={4} md={12} sm={12} style={{textAlign:"center"}}>
                    <br/>
                    <h2>Register</h2>
                    <br/>
                    <Form onSubmit={register}>
                        <Form.Control required onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" />
                        <br/>
                        <Form.Control placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} type="password" required />
                        <br/>
                        <Form.Control placeholder="First Name" onChange={(e) => {setFirstname(e.target.value)}} type="text" required />
                        <br/>
                        <Form.Control placeholder="Last Name" onChange={(e) => {setLastname(e.target.value)}} type="text" required />
                        <br/>
                        <Form.Control placeholder="Work" onChange={(e) => {setWork(e.target.value)}} type="text" required />
                        <br/>
                        <Form.Control placeholder="Country" onChange={(e) => {setCountry(e.target.value)}}  type="text" required />
                        <br/>
                        <Button type="submit">Register</Button>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
