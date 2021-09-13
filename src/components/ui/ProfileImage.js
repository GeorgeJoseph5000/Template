import React, { useRef, useState } from 'react'
import { storage, db } from '../../firebase'
import { Modal, Container, Button, Row, Form, ProgressBar, Col, ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function ProfileImage({userPackage}) {

    const progressBarProfilePic = useRef()
    const progressBarCoverPic = useRef()

    const [coverPic, setCoverPic] = useState(null)
    const [profilePic, setProfilePic] = useState(null)
    const [progressCoverPic, setProgressCoverPic] = useState(0)
    const [progressProfilePic, setProgressProfilePic] = useState(0)
    
    const [showModalProfilePic, setShowModalProfilePic] = useState(false);
    const [showModalCoverPic, setShowModalCoverPic] = useState(false);

   
    const uploadCoverPic = (e) => {
        e.preventDefault()
        var userRef = null
        if(coverPic == null){
            toast.error("Choose an image please")
            return
        }
        if(coverPic.type == "image/png" || coverPic.type == "image/jpeg"){
            userRef = storage.ref(userPackage.data.username).child("cover_pic")
        }else{
            toast.error("Use a supported image format")
            return 
        }

        const uploadTask = userRef.put(coverPic)

        uploadTask.on("state_changed", (snapshot) => {
            progressBarCoverPic.current.style.display = "flex"
            var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgressCoverPic(progress)
        }, (error) => {
            toast.error(error.message)
        },
        ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection("users").doc(userPackage.data.id).update({
                    cover_pic: downloadURL
                }).then(()=>{
                    setCoverPic(null)
                    setProgressCoverPic(0)
                    setShowModalCoverPic(false)
                    progressBarCoverPic.current.style.display = "none"
                })
            })
        })




        
    }

    const uploadProfilePic = (e) => {
        e.preventDefault()

        if(profilePic == null){
            toast.error("Choose an image please")
            return
        }

        var userRef = null
        if(profilePic.type == "image/png" || profilePic.type == "image/jpeg"){
            userRef = storage.ref(userPackage.data.id).child("profile_pic")
        }else{
            toast.error("Use a supported image format")
            return 
        }

        const uploadTask = userRef.put(profilePic)

        uploadTask.on("state_changed", (snapshot) => {
            progressBarProfilePic.current.style.display = "flex"
            var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgressProfilePic(progress)
        }, (error) => {
            toast.error(error.message)
        },
        ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection("users").doc(userPackage.data.id).update({
                    profile_pic: downloadURL
                }).then(()=>{
                    setProfilePic(null)
                    setProgressProfilePic(0)
                    setShowModalProfilePic(false)
                    progressBarProfilePic.current.style.display = "none"
                })
            })
        })
    }

    return (
        <Container>
            <ToastContainer/>
            <Row style={{backgroundImage: `url(${userPackage.data.cover_pic})`, backgroundSize: "cover"}}>
                <div className="profileImage">
                    <div className="containerProfileImage">
                        <img src={userPackage.data.profile_pic} alt={userPackage.data.username} className="image"/>
                        <div className="overlay">
                            <Button onClick={()=>{setShowModalProfilePic(true)}}>Change Profile Picture</Button>
                        </div>
                    </div>
                </div>
                <div className="endLineChild">
                    <Button onClick={()=>{setShowModalCoverPic(true)}} className="btn-floating btn-large waves-effect waves-light margin20"><i className="material-icons">edit</i></Button>
                </div>
            </Row>


            <Modal show={showModalProfilePic} onHide={()=>{setShowModalProfilePic(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Control type="file" onChange={(e)=>{setProfilePic(e.target.files[0])}} accept="image/png, image/jpeg" />
                            <br/>
                            <ProgressBar ref={progressBarProfilePic} style={{display: "none"}} animated now={progressProfilePic} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={uploadProfilePic}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <Modal show={showModalCoverPic} onHide={()=>{setShowModalCoverPic(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Cover Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Control type="file" onChange={(e)=>{setCoverPic(e.target.files[0])}} accept="image/png, image/jpeg" />
                            <br/>
                            <ProgressBar ref={progressBarCoverPic} style={{display: "none"}} animated now={progressCoverPic} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={uploadCoverPic}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
            
           
        </Container>

    )
}
