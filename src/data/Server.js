import conf from '../util/conf';
import helper from '../util/helper';
var sendRequest = async (path, options) => {
    const resp = await fetch(conf.serverLocation + path, options);
    if (resp.status === 403) {
        localStorage.setItem("authenticated", false);
        return {};
    }
    var o = await resp.json();
    return o;
};
var sendPost = async (path, data) => {
    return await sendRequest(path, {
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': helper.getCookie("XSRF-TOKEN")
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
};
var sendGet = async (path) => {
    return await sendRequest(path, {
        method: "GET",
        headers : {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
};
var Server = {};
Server.getClients = async () => {
    return await sendGet("/clients/byuser");
};
Server.getClientById = async (id) => {
    return await sendGet("/clients/" +id);
};
Server.saveClient = async (client) => {
    return await sendPost("/clients", client);
};
Server.login = async (loginData) => {
    return await sendPost("/login", loginData);
};
Server.getCountries = async () => {
    if (!Server.countries) {
        Server.countries = await sendGet("/country/list");
    }
    return Server.countries;
};

export default Server;