import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import "./styles.css" 
import Logo from "../../assets/logo.svg";

import api from '../../services/api';

export default function Register() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization : ongId
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization : ongId
                }
            });
            // alert('Caso excluído.');
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert("Falha no deletar caso");
        }

    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Be the Hero"/>
                <span> Bem vindo a {ongName}</span>
                <Link to="/incidents/new" className="btn-primary">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(inc => (
                    <li key={inc.id}>
                        <b>CASO:</b>
                        <p>{inc.title}</p>

                        <b>DESCRIÇÃO</b>
                        <p>{inc.description}</p>
                    
                        <b>VALOR</b>
                        <p> {Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(inc.value)}</p>
                        <button onClick={() => handleDeleteIncident(inc.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))} 
            </ul>
        </div>
    )
}

