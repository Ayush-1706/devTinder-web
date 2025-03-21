import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try{
            const res = await axios.post(`${BASE_URL}/request/send/${status}/${user._id}`, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId))
        } catch(err){
            console.log("Error: ", err);
        }
    }
    
    return(
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                src={photoUrl}
                alt="photo" />
            </figure>
            <div className="card-body">
                {age && gender && <p>{age + "," + gender}</p>}
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{about}</p>
                <div className="card-actions justify-end my-4">
                <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;