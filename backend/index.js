import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();

app.use(express.json()); // Para poder leer los datos que el usuario coloque en el body que deben ser en formato JSON

dotenv.config(); 

// Conectar a la base de datos
conectarDB();

// configurar cors
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        // origin es la url del cliente que hace la petición
        // callback es una función que se ejecuta al final
        if (whitelist.includes(origin)) {
            // puede acceder a la api
            callback(null, true); //null significa que no hay error y que se puede acceder
        } else {
            // no puede acceder a la api
            callback(new Error("Error de CORS"));
        }
    },
};

app.use(cors(corsOptions));

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { // un call back es una funcion que se ejecuta cuando algo sucede
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});