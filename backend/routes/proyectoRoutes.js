import express from 'express';
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas,
} from '../controllers/proyectoController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/', checkAuth, obtenerProyectos);
router.post('/', checkAuth, nuevoProyecto);
router.get('/:id', checkAuth, obtenerProyecto);
router.put('/:id', checkAuth, editarProyecto);
router.delete('/:id', checkAuth, eliminarProyecto);

router.post('/agrergar-colaborador/:id', checkAuth, agregarColaborador);
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador); 
router.get('/tareas/:id', checkAuth, obtenerTareas);

export default router;