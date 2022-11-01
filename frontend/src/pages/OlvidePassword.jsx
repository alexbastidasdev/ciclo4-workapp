import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";
import Alerta from '../components/Alerta';

const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(email === '' || email.length < 6) {
            setAlerta({
                msg: 'El Email es Obligatorio',
                error: true
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email});
            
            setAlerta({
                msg: data.msg,
                error: false
            });

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
            <h1 className="text-sky-600 font-black text-4xl capitalize text-center">Recupera tu acceso y no pierdas tus {" "}
                <span className="text-slate-600 ">Proyectos</span>
            </h1>

            { msg && <Alerta alerta={alerta} /> }

            <form className="mt-10 mb-5 bg-white shadow rounded-lg p-5" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input className="w-full mt-2 p-2 border rounded-lg bg-gray-50" type="email" id="email" placeholder="" value={email} onChange={ e => setEmail(e.target.value)} />
                </div>

                <input className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5 mt-2" type="submit" value="Enviar Instrucciones" />

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link to="/auth/registrar" className="block text-center my-3 text-slate-500 uppercase text-sm">Registrarme</Link>
                <Link to="/auth" className="block text-center my-3 text-slate-500 uppercase text-sm">Iniciar Sesión</Link>
            </nav>
        </>
    )
};

export default OlvidePassword;