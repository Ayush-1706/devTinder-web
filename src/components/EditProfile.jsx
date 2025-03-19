import React from "react";
import axios from "axios";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState(user.lastName);
    const [gender, setGender] = React.useState(user.gender);
    const [age, setAge] = React.useState(user.age);
    const [about, setAbout] = React.useState(user.about);
    const [photoUrl, setPhotoUrl] = React.useState(user.photoUrl);
    const [error, setError] = React.useState("");
    const [showToast, setShowToast] = React.useState(false);

    const saveProfile = async () => {
        setError("");
        try{
            const res = await axios.patch(`${BASE_URL}/profile/edit`, {
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about
            }, {withCredentials: true});

            dispatch(addUser(res.data.data));
            setShowToast(true)
            setTimeout(() => setShowToast(false), 3000);

        } catch(err){
            setError(err?.response?.data || "Something went wrong");
            console.log("err: ",err);
        }
    }
    
    return(
        <>
            <div className="flex items-center justify-center my-10">
                <div className="flex justify-center mx-10">
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend">Update Profile</legend>
                
                <label className="fieldset-label">First name</label>
                <input type="text" className="input" value={firstName} placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
                
                <label className="fieldset-label">Last name</label>
                <input type="text" className="input" value={lastName} placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
                
                <label className="fieldset-label">Gender</label>
                <input type="dropdown" className="input" value={gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
                
                <label className="fieldset-label">Photo URL</label>
                <input type="text" className="input" value={photoUrl} placeholder="Photo URL" onChange={(e) => setPhotoUrl(e.target.value)} />
                
                <label className="fieldset-label">Age</label>
                <input type="text" className="input" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                
                <label className="fieldset-label">About</label>
                <input type="textarea" className="input" value={about} placeholder="About" onChange={(e) => setAbout(e.target.value)} />
                
                <p className="text-error-red">{error}</p>
                <button className="btn btn-neutral mt-4" onClick={saveProfile}>Save Profile</button>
                </fieldset>
            </div>

            <UserCard user={{firstName, lastName, age, gender, photoUrl, about}}/>
            </div>
            <div className="toast toast-top toast-center">
            {showToast && <div className="alert alert-success">
                <span>Profile updated successfully.</span>
            </div>}
            </div>
        </>
    )
}

export default EditProfile;