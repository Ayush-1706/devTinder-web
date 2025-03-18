import axios from "axios";
import React from "react";

export default function Login () {

    const [emailId, setEmailId] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        console.log("credentials: ",emailId, password);
        try{
            const res = await axios.post("http://localhost:7777/login",
                {emailId,
                password
            }, {withCredentials: true});
                
            if(res){
                console.log("res", res)
            }

        } catch(err){
            console.log("Error: ",err)
        }

    }

    return(
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
                <div>
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

                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
            </div>
            </div>
        </div>
    )
}