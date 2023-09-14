import { useState } from 'react'
import './Registration.css'

function Registration() {
    const [email, setEmail] = useState('')
    const [emailClass, setEmailClass] = useState('')
    const [emailmsg, setEmailmsg] = useState('')

    const [password, setPassword] = useState('')
    const [passwordClass, setPasswordClass] = useState('')
    const [passwordmsg, setPasswordmsg] = useState('')

    const [enabledButton, setEnabledButton] = useState(true)

    const [msg, setMsg] = useState('')

    const checkFields = () => {     // Revisa que los fields del form estén completos, para permitir realizar el registrp
        if (emailClass === "field-filled" && passwordClass === "field-filled") {
            setEnabledButton(false)
        } else{
            setEnabledButton(true)
        }
    }
    
    const handleEmail = (e) => {     // Revisa que el email tenga @ y que no esté vacío
        if (e != "") {
            setEmail(e)
            if (!e.includes("@")) {
                setEmailmsg("Insert a valid email adress")
                setEmailClass("")
            } else {
                setEmailmsg("")
                setEmailClass("field-filled")
            }
        } else {
            setEmail("")
            setEmailClass("")
        }
        checkFields()
    }

    const handlePassword = (p) => {     // Revisa que la contraseña tenga al menos 8 caracteres
        if (p != "") {
            setPassword(p)
            if (p.length < 8) {
                setPasswordmsg("Write at least 8 characters")
                setPasswordClass("")
            } else {
                setPasswordmsg("")
                setPasswordClass("field-filled")
            } 
        } else {
            setPassword("")
            setPasswordClass("")
        }
        checkFields()
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        axios.post(`${API_URL}/auth/signup`, {
            email: email,
            password: password
        }).then((response) => {
            setMsg("Registro exitoso! Vuelve a la página anterior para logearte :)")
        }).catch((error) => {
            setMsg("Error al registrarse :(")
        })
    }


    return (
      <>
        <h1>Registration</h1>

        {/* <form action="/register" method="post" id="register-form" className="form"> */}
        <form id="register-form" className="form" onSubmit={handleSubmit}>
            <div className="login-fields">

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} className={emailClass} onChange={e => handleEmail(e.target.value)} required />
                    <p>{emailmsg}</p>
                </div>

                <div className="field">
                    <label htmlFor="email">Password</label>
                    <input type="password" name="password" id="password" value={password} className={passwordClass} onChange={p => handlePassword(p.target.value)} required />
                    <p>{passwordmsg}</p>
                </div>

                

                <button type="submit" className="btn" disabled={enabledButton} >Register</button>

            </div>
        
        </form>

  
      </>
    )
  }
  
  export default Registration
  