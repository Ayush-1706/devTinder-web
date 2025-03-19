import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

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

    React.useEffect(() => {
        fetchRequests();
    }, [])

    if(!requests) return;

    if(requests.length === 0) {
        return <h1>No connections requests found</h1>
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
                            <button className="btn btn-primary mx-5">Accept</button>
                            <button className="btn btn-secondary mx-5">Ignore</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Request;