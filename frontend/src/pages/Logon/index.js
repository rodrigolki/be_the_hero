import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import "./styles.css" 

import heroesImg from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";

import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState("")

    const history = useHistory();

    async function  handleLogon(e) {
        e.preventDefault();

        const data = { id };
        
        try {
            const ret = await api.post('sessions', data)
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', ret.data.nome);
            history.push("/profile");

        } catch (error) {
            alert("Falha no login");
        }
       
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Logo"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}    
                    />
                    <button className="btn-primary" type="submit">Entrar</button>
                    <Link  className="link-texto" to="/register">
                        <FiLogIn size={16} color="#E02041"/> 
                        Não tem cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}

