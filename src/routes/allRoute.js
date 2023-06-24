import { createUserController, deleteUserController, getAllController, getIdController, updateUserController } from '../controller/userController.js';
import express from 'express';

const router = express.Router();

// user
router.get('/users', getAllController);
router.get('/users/:id', getIdController);
router.post('/users', createUserController);
router.patch('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

//product

export default router;
