import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";

const Feed = () => {
    const feed = useSelector((state) => state.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        getFeed();
    }, [])

    const getFeed = async() => {
        if(feed) return;
        try{
            const res = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true});
            dispatch(addFeed(res.data));
        } catch(err){
            console.log(err);
        }
    }

    return(
        feed && <div className="flex justify-center my-10">
            <UserCard user={feed[0]} />
        </div>
    )
}

export default Feed;