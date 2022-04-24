import React from "react";
import  { Navigate } from 'react-router-dom'
import * as queryString from "query-string";
import axios from "axios";


class Outh extends React.Component {
    render(){
        var token = localStorage.getItem("token");
        if (token) {
            return (
                <Navigate to="/dashboard" replace={true} />
            )
        }
        var params = queryString.parse(window.location.search);
        if (!params.code) {
            return (
                <Navigate to="/login" replace={true} />
            )
        }
        axios.post("/auth/login", {code: params.code}).then(res => {
            localStorage.setItem("token", res.data.token);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
    }
}

export default Outh;