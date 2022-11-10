import React, { useState } from 'react';
import Server from '../data/Server';
import { Navigate, useNavigate } from "react-router-dom";
import helper from '../util/helper';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        var resp = await Server.login({ username: username, password: password });
        if (resp.result === "ok") {
            helper.setLogin(true);
            if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
            } else {
                navigate('/clients'); 
            }
        }
    };
    if (helper.checkLogin() === true) {
        return <Navigate replace to="/" />;
    }
    return (
        <div className='container'>
            <div className='py-5 text-center'>
                <h2>Login to use the site</h2>
            </div>
            <div className="row">
                <div className="col-md-12 order-md-1">

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="username">Username</label>
                                <input className="form-control"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password">Password</label>
                                <input className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={(e) => setpassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary btn-lg btn-block" type="submit">Log in</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;