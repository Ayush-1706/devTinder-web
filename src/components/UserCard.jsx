import React from "react";

const UserCard = ({user}) => {
    const { firstName, lastName, photoUrl, age, gender, about} = user;
    
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
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;