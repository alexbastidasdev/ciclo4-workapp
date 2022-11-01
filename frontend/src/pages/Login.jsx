import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password });
            setAlerta({});
            localStorage.setItem('token', data.token);

        } catch (error) {            
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-4xl capitalize text-center">Inicia Sesión y Administra tus {" "}
                <span className="text-slate-600 ">Proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            <form className="mt-10 mb-5 bg-white shadow rounded-lg p-5" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input className="w-full mt-2 p-2 border rounded-lg bg-gray-50" type="email" id="email" placeholder="" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                    <input className="w-full mt-2 p-2 border rounded-lg bg-gray-50" type="password" id="password" placeholder="" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <input className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5 mt-4" type="submit" value="Iniciar Sesión" />

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link to="/auth/registrar" className="block text-center my-3 text-slate-500 uppercase text-sm">Registrarme</Link>
                <Link to="/auth/olvide-password" className="block text-center my-3 text-slate-500 uppercase text-sm">olvidé mi password</Link>
            </nav>
        </>
    )
};

export default Login;