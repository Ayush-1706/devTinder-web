import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try{
            const res = await axios.get(`${BASE_URL}/user/connection`, {withCredentials: true});
            dispatch(addConnection(res.data.data));
        } catch(err){
            console.log("Error: ", err);
        }
    }

    React.useEffect(() => {
        fetchConnections();
    },[])

    if(!connections) return;

    if(connections.length === 0) {
        return <h1 className="flex justify-center text-2xl">No connections found</h1>
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-bold color-black text-3xl"> Connections </h1>
            {connections.map((data) => {
                const {_id, firstName, lastName, photoUrl, about, age, gender} = data;
                return (
                    <div key={_id} className="flex m-4 p-4 bg-base-300 rounder-lg w-1/2 mx-auto">
                        <div>
                            <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            <p>{about}</p>
                            {age && gender && <p>{age + " " + gender}</p>}
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default Connections;