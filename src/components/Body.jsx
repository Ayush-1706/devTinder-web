import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function Body() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user)

    const fetchUser = async () => {
        if(userData) return;
        try{
            const res = await axios.get(`${BASE_URL}/profile/view`, {withCredentials: true});
            dispatch(addUser(res.data));
        } catch(err){
            if(err.status === 401){         // Incase user is not loggedIn and token is not present
                navigate("/login");
            }
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return(
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}