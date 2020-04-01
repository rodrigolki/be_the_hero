import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import "./styles.css" 
import logo from "../../assets/logo.svg";

import api from '../../services/api';

export default function NewIncident() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")

    const history = useHistory();
    const ong_id = localStorage.getItem('ongId')

    async function handleCaso(e) {
        e.preventDefault();

        const data ={ title, description, value};

        try {
            await api.post('incidents', data,{
                headers:{
                    Authorization : ong_id
                }
            })
            alert(`Caso cadastrado com sucesso`);
            history.push("/profile")
        } catch (error) {
            alert("Erro no cadastro de caso");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>
                       Descreva seu caso detalhadamento para encotrar um herói e assim resolve-lo.
                    </p>
                    <Link className="link-texto" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/> 
                        Voltar para início
                    </Link>
                </section>
                <form onSubmit={handleCaso}>
                    <input 
                        type="text" 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}    
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}   
                    />
                    <input 
                        type="text" 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}   
                    />
                  
                    <button className="btn-primary"> Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

