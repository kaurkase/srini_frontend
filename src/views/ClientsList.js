import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Server from '../data/Server';
import helper, { useLocationEffect } from '../util/helper';


const ClientsList = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [rerender, setRerender] = useState([]);
    const getClients = async () => {
        var resp = await Server.getClients();
        setClients(resp.clients);
    };
    useEffect(() => {
        getClients();
    }, []);
    useLocationEffect((location) => {
        setRerender(true);
    });
    const editClient = (client) => {
        navigate("/client", { state: client });
    };
    const createClientRows = (clients) => {
        return clients.map(client => {
            return (
                <tr key={"tr" + client.id}>
                    <th scope='row'>{client.id}</th>
                    <td>{client.firstName}</td>
                    <td>{client.lastName}</td>
                    <td>{client.username}</td>
                    <td onClick={() => editClient(client)} className='btn btn-primary'>Edit client</td>
                </tr>
            );
        });
    };
    if (!helper.checkLogin()) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div className='container'>
                <div className="py-5 text-center">
                    <h2>Clients</h2>
                </div>
                <div className='row'>
                    <a onClick={editClient} className='btn btn-primary'>Add client</a>
                    <table className='table'>
                        <thead>
                            <tr>
                                <td scope='col'>#</td>
                                <td scope='col'>First</td>
                                <td scope='col'>Last</td>
                                <td scope='col'>Username</td>
                                <td scope='col'></td>
                            </tr>
                        </thead>
                        <tbody>
                            {createClientRows(clients)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};
export default ClientsList;