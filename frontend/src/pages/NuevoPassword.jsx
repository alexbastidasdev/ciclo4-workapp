import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
        comprobarToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({
                msg: "El Password debe tener mínimo 6 caracteres",
                error: true
            });
            return;
        }

        try {
            const url = `/usuarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });

            setAlerta({
                msg: data.msg,
                error: false
            });

            setPasswordModificado(true);

            setPassword('');

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-4xl capitalize text-center">Reestablece tu password y no pierdas acceso a tus {" "}
                <span className="text-slate-600 ">Proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            {tokenValido && (
                <form className="mt-10 mb-5 bg-white shadow rounded-lg p-5" onSubmit={handleSubmit}>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Nuevo Password</label>
                        <input className="w-full mt-2 p-2 border rounded-lg bg-gray-50" type="password" id="password" placeholder="" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <input className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5 mt-4" type="submit" value="Guardar Nuevo Password" />

                </form>
            )}

            {passwordModificado && (
                <Link to="/auth" className="block text-center my-5 text-slate-500 uppercase text-sm">Inicia Sesión</Link>
            )}

        </>
    )
};

export default NuevoPassword;