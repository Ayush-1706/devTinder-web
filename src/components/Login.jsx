import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export default function Login () {

    const [emailId, setEmailId] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [isLoginForm, setIsLoginForm] = React.useState(true);
    const [error, setError] = React.useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await axios.post(BASE_URL + "/login",
                {emailId,
                password
            }, {withCredentials: true});
                
            if(res){
                dispatch(addUser(res.data));
                navigate('/');
            }

        } catch(err){
            setError(err?.response?.data || "Something went wrong");
            console.log("Error: ",err.response)
        }
    }

    const handleSignUp = async () => {
        try{
            const res = await axios.post(`${BASE_URL}/signup`, {firstName, lastName, emailId, password}, {withCredentials: true});
            dispatch(addUser(res.data.data));
            return navigate('/profile');
        } catch(err){
            console.log("Errpr: ", err);
        }
    }

    return(
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"} </h2>
                <div>

                {!isLoginForm && 
                <>
                    <label className="input validator">
                    <input 
                        type="text" 
                        value={firstName}
                        placeholder="John" 
                        onChange={(e) => setFirstName(e.target.value)}
                        required/>
                    </label>

                    <label className="input validator">
                    <input 
                        type="text" 
                        value={lastName}
                        placeholder="Doe" 
                        onChange={(e) => setLastName(e.target.value)}
                        required/>
                    </label>
                </>}

                <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                <input 
                    type="email" 
                    value={emailId}
                    placeholder="mail@site.com" 
                    onChange={(e) => setEmailId(e.target.value)}
                    required/>
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
                </div>
                <label className="input validator">

                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    placeholder="Password" 
                    minLength="5" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" 
                    title="Must be more than 5 characters, including number, lowercase letter, uppercase letter" />
                </label>
                <p className="validator-hint hidden">
                Must be more than 5 characters, including
                <br/>At least one number
                <br/>At least one lowercase letter
                <br/>At least one uppercase letter
                </p>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"} </button>
                </div>

                <p className="m-auto cursor-pointer py-2" onClick={()  => setIsLoginForm(value => !value)}>
                    {isLoginForm ? "New user ? Please sign up" : "Already have an account? Please login"}
                </p>
            </div>
            </div>
        </div>
    )
}