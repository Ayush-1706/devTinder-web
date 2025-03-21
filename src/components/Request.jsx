import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true});
            dispatch(addRequest(res.data.data));
        } catch(err) {
            console.log("Error: ", err);
        }
    }

    const reviewRequests = async(status, _id) => {
        try{
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        } catch (err){
            console.log("ERROR: ", err);
        }
    }

    React.useEffect(() => {
        fetchRequests();
    }, [])

    if(!requests) return;

    if(requests.length === 0) {
        return <h1 className="flex justify-center text-2xl">No connections requests found</h1>
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-bold color-black text-3xl"> Connection requests </h1>
            {requests.map((data) => {
                const {_id, firstName, lastName, photoUrl, about, age, gender, skills} = data.fromUserId;
                return (
                    <div key={_id} className="flex justify-between item-center m-4 p-4 bg-base-300 rounder-lg w-2/3 mx-auto">
                        <div>
                            <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            <p>{about}</p>
                            {skills.length ? <p>{skills.join(", ")}</p> : null}
                            {age && gender && <p>{age + ", " + gender}</p>}
                        </div>
                        <div>
                            <button className="btn btn-primary mx-5" onClick={() => reviewRequests("accepted", data.fromUserId._id)}>Accept</button>
                            <button className="btn btn-secondary mx-5" onClick={() => reviewRequests("rejected", data.fromUserId._id)}>Ignore</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Request;