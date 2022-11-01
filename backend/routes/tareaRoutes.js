import express from 'express';
import {
    agregarTarera,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
} from '../controllers/tareaController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', checkAuth, agregarTarera);
router.get('/:id', checkAuth, obtenerTarea);
router.put('/:id', checkAuth, actualizarTarea);
router.delete('/:id', checkAuth, eliminarTarea);
router.put('/estado/:id', checkAuth, cambiarEstado); 

export default router;