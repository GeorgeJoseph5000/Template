import React, {useState, useContext} from 'react'
import { db, auth } from '../../firebase'
import { useHistory } from "react-router-dom"
import {UserContext} from '../../App'
import Loading from '../ui/Loading'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { ToastContainer ,toast } from 'react-toastify'

export default function CompleteRegister() {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [work, setWork] = useState("")
    const [country, setCountry] = useState("")
    const [email, setEmail] = useState("")
    
    let history = useHistory()


    const { userPackage, addCompleteRegister} = useContext(UserContext)

    if(userPackage != null){
        history.push("/")
        return <Loading/>
    }


    const completeRegister = (e) => {
        e.preventDefault()

        if(firstname == "" || lastname == "" || work == "" || country == "" || email == ""){
            toast.error("Fill out all fields")
            return ""
        }
        
        if(auth.currentUser == null){
            history.push("/")
            return ""
        }


        var data = {
            id: auth.currentUser.uid,
            firstname: firstname,
            lastname: lastname,
            work: work,
            country: country,
            profile_pic: auth.currentUser.photoURL,
            cover_pic: "https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2880x1800-1455.jpg"
        }

        db.collection("users").doc(auth.currentUser.uid).set(data).then(()=>{
            addCompleteRegister(auth.currentUser, data)
            history.push("/")
            }
        )
    }

    const showEmail = (e) => {
        e.preventDefault()
        if(auth.currentUser == null){
            history.push("/")
            return ""
        }
        if(email == ""){
            setEmail(auth.currentUser.email)
        }else{
            setEmail("")
        }
    }


    return (
        <Container>

            <ToastContainer />
            <Row>
                <Col md={4}></Col>
                <Col lg={4} md={12} sm={12} style={{textAlign: "center"}}>
                    <br/>
                    <h2>Complete Register</h2>
                    <br/>
                    <Button onClick={showEmail}>Show/Hide Email</Button>
                    <br/><br/>
                    <p>{email}</p>
                    <Form onSubmit={completeRegister}>
                        <Form.Control required type="text" onChange={(e) => {setFirstname(e.target.value)}}  placeholder="First Name" />
                        <br/>
                        <Form.Control required type="text" onChange={(e) => {setLastname(e.target.value)}} placeholder="Last Name" /> 
                        <br/>
                        <Form.Control required type="text" onChange={(e) => {setWork(e.target.value)}} placeholder="School or Work" /> 
                        <br/>
                        <Form.Control required type="text" onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" /> 
                        <br/>
                        <Button type="submit">Save</Button>
                        
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}
