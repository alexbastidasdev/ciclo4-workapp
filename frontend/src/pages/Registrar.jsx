import { useState } from "react"; // useState sirve para crear variables de estado, las cuales sirven para guardar datos en el componente
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {

    const [nombre, setNombre] = useState(''); // useState devuelve un arreglo con dos valores, el primero es el valor de la variable de estado y el segundo es una función que nos permite modificar el valor de la variable de estado
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({}); 

    const handleSubmit = async e => {
        e.preventDefault(); // Evita que la página se recargue
        
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            }); 
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Los passwords no son iguales',
                error: true
            });
            return;
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'El password debe tener al menos 6 caracteres',
                error: true
            });
            return;
        }

        setAlerta({}); // Si no hay errores, limpiamos la alerta

        // crear el usuario en la API
        try {
            const { data } = await clienteAxios.post(`/usuarios`, {
                nombre,
                email,
                password,
            });

            setAlerta({
                msg: data.msg,
                error: false
            });

            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta; // sirve para extraer el valor de la propiedad msg del objeto alerta
    
    return (
        <>
            <h1 className="text-sky-600 font-black text-4xl capitalize text-center">Crea tu Cuenta y Administra tus {" "}
                <span className="text-slate-600 ">Proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />} {/* Si msg existe, entonces muestra el componente Alerta */} 

            <form className="mt-10 mb-5 bg-white shadow rounded-lg p-5" onSubmit={handleSubmit}>
                <div className="my-3">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
                    <input className="w-full mt-2 p-2 border rounded-lg bg-gray-50" type="text" id="nombre" placeholder="" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>

                <div className="my-3">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input className="w-full mt-2 p-2 border rounded-lg bg-gray-50" type="email" id="email" placeholder="" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="my-3">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                    <input className="w-full mt-2 p-2 border rounded-lg bg-gray-50" type="password" id="password" placeholder="" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="my-3">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="repetir-password">Repetir Password</label>
                    <input className="w-full mt-2 p-2 border rounded-lg bg-gray-50" type="password" id="repetir-password" placeholder="" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} />
                </div>

                <input className="w-full bg-sky-700 py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 transition-colors mb-3 mt-4" type="submit" value="Crear Cuenta" />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link to="/auth" className="block text-center my-3 text-slate-500 uppercase text-sm">Iniciar Sesión</Link>
                <Link to="/auth/olvide-password" className="block text-center my-3 text-slate-500 uppercase text-sm">olvidé mi password</Link>
            </nav>
        </>
    )
};

export default Registrar;