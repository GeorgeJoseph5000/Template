import React, { useContext } from 'react'
import {UserContext} from '../../App'
import { useHistory } from "react-router-dom"
import { Container } from 'react-bootstrap'

export default function Home() {

    const { userPackage } = useContext(UserContext)
    let history = useHistory()
    
    if(userPackage == null){
        return (
        <Container>
            <h2>Home</h2>
        </Container>
        )
    }

    return (
        <Container>
            <h2>Home</h2>
            <img style={{width: "100px"}} src={userPackage.data.profile_pic}  />

        </Container>
    )
}
