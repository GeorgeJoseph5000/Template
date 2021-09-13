import React, { useContext, useRef } from 'react'
import {UserContext} from '../../App'
import { useHistory } from "react-router-dom"
import Loading from '../ui/Loading'
import ProfileImage from '../ui/ProfileImage'

export default function Profile() {

    
    const { userPackage } = useContext(UserContext)
    let history = useHistory()

    
    if(userPackage == null){
        history.push("/")
        return <Loading/>
    }

    const uploadCoverPic = {}

    return (
        <ProfileImage userPackage={userPackage} />
    )
}