import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom';
import './CompanyDetail.css'


function CompanyDetail() {

    const API_URL= 'http://localhost:8000'

    const { companyName } = useParams();
    console.log(companyName, "companyname")
    const [page, setPage] = useState(1);
    const [msg, setMsg] = useState("");
    // const location = useLocation();                                 // Este código fue proporcionado por ChatGPT para obtener query parameters
    // const searchParams = new URLSearchParams(location.search);
    const [stocks, setStocks] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    
    // const stocks = [
    //     {"price": 1673,
    //     "currency": "USD",
    //     "datetime": "2023-09-03T22:44:48.398Z"},
    //     {"price": 2623,
    //     "currency": "USD",
    //     "datetime": "2023-09-03T22:49:48.449Z"}, 
    //     {"price": 2634,
    //     "currency": "USD",
    //     "datetime": "2023-09-03T22:54:48.509Z"},
    //     {"price": 2650,
    //     "currency": "USD",
    //     "datetime": "2023-09-03T22:59:48.563Z"},
    //     {"price": 2677,
    //     "currency": "USD",
    //     "datetime": "2023-09-03T23:04:48.691Z"},
    //     {"price": 2677,
    //     "currency": "USD",
    //     "datetime": "2023-09-03T23:09:48.673Z"},
    //     {"price": 2677,
    //     "currency": "USD",
    //     "datetime": "2023-09-03T23:14:48.744Z"}
    // ]

    function getDateComponents(dateString) {
        const date = new Date(dateString);

        const options = { month: 'long', weekday: 'long' };
        const names = date.toLocaleDateString(undefined, options);
      
        const year = date.getFullYear();
        const month = [date.getMonth() + 1, names.split(" ")[0]]; // Months are zero-based, so add 1
        const day = [date.getDate(), names.split(" ")[1]];
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
      
        return [year, month, day, hour, minute, second];
      }
      

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        axios.get(`${API_URL}/stocks/${companyName}?page=${page}`) 
          .then((response) => {
            console.log(response.data, "response.data")
            setStocks(response.data.history);
            setMsg("Información obtenida correctamente");
          })
          .catch((error) => {
            console.log("error", error)
            setMsg(`Error al obtener la información de las empresas ${error.response.data.message}`)
          });
      }, []);
 
    return (
        <>
        <div>
            <h1>Información de { companyName }</h1>
            <button onClick={() => butStock()}>Buy</button>
            { stocks ? (stocks.map(function(stock, i) {
                // const stock_info = getDateComponents(stock.datetime)
                console.log(stock, "stock_info")
                const dateComponents = getDateComponents(stock.datetime)
                console.log(dateComponents, "dateComponents")
                            return(
                                <div key={i} className="stock">
                                    <p>{dateComponents[2][1]} {dateComponents[2][0]} {dateComponents[1][1]} {dateComponents[0]}</p>
                                    <p>{dateComponents[3]}:{dateComponents[4]}:{dateComponents[5]}</p>
                                    <p>${stock.price} {stock.currency}</p>
                                </div>
                            )
                        })) :( <p>Loading stocks...</p>)
                    }
        </div>
        
        </>
    )

}

export default CompanyDetail