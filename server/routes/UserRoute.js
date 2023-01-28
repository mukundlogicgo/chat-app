import express from 'express'
import { createUser, getUser, getUserByName } from '../controllers/UserController.js';

const router = express.Router()

router.get('/name/:username', getUserByName);
router.get('/:id', getUser);
router.post("/", createUser)

export default router