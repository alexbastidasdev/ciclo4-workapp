import { useEffect, useState } from "react"; 
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

    const [alerta, setAlerta] = useState({});
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${token}`;
                const { data } = await clienteAxios(url);
                
                setAlerta({
                    msg: data.msg,
                    error: false
                });

                setCuentaConfirmada(true);

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
        confirmarCuenta();
    }, []);

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-4xl capitalize text-center">confirma tu cuenta y comienza a crear tus {" "}
                <span className="text-slate-600 ">Proyectos</span>
            </h1>

            <div className="mt-10 md:mt-10 shadow-lg p-10 rounded-lg bg-white">
                {msg && <Alerta alerta={alerta} />}

                {cuentaConfirmada && (
                    <Link to="/auth" className="block text-center my-5 text-slate-500 uppercase text-sm">Inicia Sesión</Link>
                )}
            </div>
        </>
    )
};

export default ConfirmarCuenta;