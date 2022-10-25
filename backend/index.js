import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';

const app = express();

app.use(express.json()); // Para poder leer los datos que el usuario coloque en el body que deben ser en formato JSON

dotenv.config(); 

// Conectar a la base de datos
conectarDB();

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { // un call back es una funcion que se ejecuta cuando algo sucede
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});