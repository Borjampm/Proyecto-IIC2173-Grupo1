import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './CompaniesList.css'
import axios from 'axios'

function CompaniesList() {

    const API_URL = 'https://borjampm.me'    // URL de la API

    // const [companies, setCompanies] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después

    const [msg, setMsg] = useState("");     // Variable que almacena el mensaje de error
    
    const companies = [                   // Este es el formato en el que se tienen que recuperar los datos de la API
        {"shortName": "Apple Inc.", "symbol": "AAPL"},
        {"shortName": "Microsoft Corporation", "symbol": "MSFT"},
        {"shortName": "Amazon.com, Inc.", "symbol": "AMZN"}
    ]

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        axios.get(`${API_URL}/companies-names`) 
          .then((response) => {
            setCompanies(response.data);
            setMsg("Empresas obtenidas correctamente");
          })
          .catch((error) => {
            setMsg(`Error al obtener las empresas ${error.response.data.message}`)
          });
      }, []);

 
    return (
        <>
            <div className="companies-v-container">
                <p>{ msg }</p>
                <h1>Companies</h1>
                    <div className="companies">
                        { companies ? (
                            companies.map((company) =>
                                <Link key={company.symbol} to={`/stocks/${company.symbol}`}>
                                    <div className="company">
                                        <p>{ company.symbol }</p>
                                        <h3>{ company.shortName }</h3>
                                    </div>
                                </Link>
                            )) : (
                                <p>Loading companies...</p>
                            )
                        }
                    </div>
                </div>
                

        </>
    )

}

export default CompaniesList