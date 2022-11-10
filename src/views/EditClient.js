import React, { useState, useEffect } from 'react';
import Server from '../data/Server';
import helper, { useLocationEffect } from '../util/helper';
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const EditClient = (props) => {
    const [showSaved, setShowSaved] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [client, setClient] = useState(location.state || {});
    const [countries, setCountries] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const saveClient = async (e) => {
        e.preventDefault();

        var resp = await Server.saveClient(client);
        if (resp.validationErrors) {
            setValidationErrors(resp.validationErrors);
        } else {
            setClient(resp);
            setValidationErrors({});
            setShowSaved(true);
        }
    };
    const updateField = (e) => {
        var fieldName = e.target.name;
        var value = e.target.value;
        setClient((prevClient) => {
            return ({ ...prevClient, [fieldName]: value });
        });
        setShowSaved(false);
    };
    const updateCountry = (e) => {
        var value = e.target.value;
        setClient((prevClient) => {
            return ({ ...prevClient, country: { code: value } });
        });
        setShowSaved(false);
    };
    const getCountries = async () => {
        var countries = await Server.getCountries();
        setCountries(countries);
    };
    const renderOptions = () => {
        var optionList = [(<option key="choose" value="choose">Choose...</option>)];
        countries.forEach(country => {
            optionList.push((<option key={country.code} value={country.code}>{country.name}</option>));
        });
        return optionList;
    };
    const reloadClient = async () => {
        if (client && client.id) {
            var c = await Server.getClientById(client.id);
            setClient(c);
        }
    };
    useLocationEffect((location) => {
        reloadClient();
    });
    useEffect(() => {
        getCountries();
    }, []);
    if (!helper.checkLogin()) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div className='container'>
                <div className='py-5 text-center'>
                    <h2>Add Client</h2>
                </div>
                <div className="col-md-12 order-md-1">
                    <form className="needs-validation" noValidate="">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input name="firstName" onChange={updateField} type="text" className={"form-control " + (validationErrors.firstName ? "is-invalid" : "")} id="firstName" placeholder="" value={client.firstName || ""}></input>
                                <small className="text-danger">{validationErrors.firstName || ""}</small>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input name="lastName" onChange={updateField} type="text" className={"form-control " + (validationErrors.lastName ? "is-invalid" : "")} id="lastName" placeholder="" value={client.lastName || ""}></input>
                                <small className="text-danger">{validationErrors.lastName || ""}</small>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username">Username</label>
                            <div className="input-group">
                                <input name="username" onChange={updateField} type="text" className={"form-control " + (validationErrors.username ? "is-invalid" : "")} id="username" placeholder="Username" value={client.username || ""}></input>
                            </div>
                            <small className="text-danger">{validationErrors.username || ""}</small>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                            <input name="email" onChange={updateField} type="email" className={"form-control " + (validationErrors.email ? "is-invalid" : "")} id="email" placeholder="you@example.com" value={client.email || ""}></input>
                            <small className="text-danger">{validationErrors.email || ""}</small>

                        </div>

                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input name="address" onChange={updateField} type="text" className={"form-control " + (validationErrors.address ? "is-invalid" : "")} id="address" placeholder="1234 Main St" value={client.address || ""}></input>
                            <small className="text-danger">{validationErrors.address || ""}</small>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country">Country</label>
                            <select value={client.country ? client.country.code : "choose"} name="country" onChange={updateCountry} className={"custom-select d-block w-100 " + (validationErrors.country ? "is-invalid" : "")} id="country">
                                {renderOptions()}
                            </select>
                            <small className="text-danger">{validationErrors.country || ""}</small>
                        </div>
                        <hr className="mb-4"></hr>
                        <div className="row">
                            <div className='col-md-6 mb-3'>
                                <button onClick={(e) => { e.preventDefault(); navigate('/clients') }} className="btn btn-primary btn-lg btn-block">Back to clients list</button>
                            </div>
                            <div className='col-md-6 mb-3'>
                                <button onClick={saveClient} className="btn btn-primary btn-lg btn-block" type="submit">Save Client</button>
                            </div>
                        </div>
                        <div className={'text-danger font-weight-bold ' + (showSaved ? 'visible' : 'invisible')}>Saved</div>
                    </form>
                </div>
            </div>
        );
    }
};

export default EditClient;