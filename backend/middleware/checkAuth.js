import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js'; 

const checkAuth = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { 
        try {
            token = req.headers.authorization.split(' ')[1]; // sirve para separar el token del bearer y quedarnos solo con el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // decodificamos el token
            req.usuario = await Usuario.findById(decoded.id).select('-password -token -__v -confirmado -createdAt -updatedAt'); 
            return next();
        } catch (error) {
            return res.status(404).json({ msg: 'hubo un error' });
        }
    }

    if (!token) {
        const error = new Error('token no válido');
        return res.status(401).json({ msg: error.message });
    }

    next();
};

export default checkAuth;