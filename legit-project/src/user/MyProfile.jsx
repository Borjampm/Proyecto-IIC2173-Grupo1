import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './MyProfile.css'
import axios from 'axios'
import AuthButton from "./AuthButton";
import { useAuth0 } from '@auth0/auth0-react';


function MyProfile() {
    const { user, isAuthenticated } = useAuth0();
    const API_URL = 'http://localhost:8000'    // URL de la API

    // const [userInformation, setUserInformation] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después

    const [msg, setMsg] = useState("");     // Variable que almacena el mensaje de error
    const [moneyAdded, setMoneyAdded] = useState(0); 

    // const companies = [                   // Este es el formato en el que se tienen que recuperar los datos de la API
    //     {"shortName": "Apple Inc.", "symbol": "AAPL"},
    //     {"shortName": "Microsoft Corporation", "symbol": "MSFT"},
    //     {"shortName": "Amazon.com, Inc.", "symbol": "AMZN"}
    // ]
    const [userInformation, setUserInformation] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    // if (isAuthenticated) {
    //     console.log(user, "user")
    //     setUserInformation(user)
    // }
    // const userId = 1
    // const userInformation = {
    //       "username": "jose",
    //       "password": "1234",
    //       "money": 10000
    //   }

    const handleMoney = async(e) => {
        console.log("signing up")
        axios.post(`${API_URL}/users/signup`, {
            Username: user.sub,
            Mail: user.email,
            Wallet: 0
        }).then((response) => {
            console.log(response)
            setMsg("Money added correctly")
        }).catch((error) => {
            console.log(error)
            setMsg("Error adding money")
        })
            
        // axios.post(`${API_URL}/users/add-money`, {
        //     userId: userId,
        //     amount: moneyAdded
        // }).then((response) => {
        //     setMsg("Money added correctly")
        // }).catch((error) => {
        //     setMsg("Error adding money")
        // })
    }

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        if (user) {
        axios.get(`${API_URL}/users/${user.sub}`) 
          .then((response) => {
            setUserInformation(response.data);
            console.log(response.data, "user information")
            setMsg("Información de usuario obtenida correctamente");
          })
          .catch((error) => {
            setMsg(`Error al obtener información de usuario${error}`)
          });
        }
    
      }, []);

    const handleMoneyAmount = (p) => {     // Revisa que la contraseña tenga al menos 8 caracteres
        if (p >= 0) {
            setMoneyAdded(p)
        } else {
            setMoneyAdded(0)
        }
    }

    const handleDB = async(e) => {      // Envía los datos al backend para hacer efectivo el registro
        console.log("hiii")
        axios.post(`${API_URL}/users/addfunds`, {
            Username: user.sub,
            Funds: 1000
        }).then((response) => {
            setMsg("Money added correctly")
        }).catch((error) => {
            console.log(error)
            setMsg("Error adding money")
        })
    }
    

    


 
    return (
        <>
            <div className="user-container">
                <p>{ msg }</p>
                <AuthButton />
                {/* <h1>User {userId}</h1> */}
                        { user ? (
                            <div className="user-information">
                                <p>Username: {user.sub}</p>
                                <p>Password: {user.email}</p>
                                {/* <p>Money: {userInformation.money}</p> */}
                                <form id="register-form" className="form" onSubmit={handleMoney}>
                                    <button type="submit">Add to db</button>
                                </form>
                                
                                <form id="db" className="form" onSubmit={handleDB}>
                                    <div className="field">
                                        <label htmlFor="money">Amount</label>
                                        <input type="number" name="money" id="money" value={moneyAdded} onChange={m => handleMoneyAmount(m.target.value)} required />
                                    </div>
                                    <button type="submit">Add to money</button>
                                </form>
                                <Link to="/my-stocks">
                                    <button className="btn">See my stocks
                                    </button>
                                </Link>
                            </div>
                           ) : (
                                <p>Loading user information...</p>
                            )
                        }
                </div>
                

        </>
    )

}

export default MyProfile