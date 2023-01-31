import express from 'express'
import {
    addUserToGroup,
    createChat,
    createGroupChat,
    findChat,
    getGroupById,
    getGroupByname,
    userChats,
    userGroupChats
} from '../controllers/ChatController.js';

const router = express.Router()

router.post('/', createChat);

router.post('/group', createGroupChat);
router.post('/group/user', addUserToGroup);
router.get('/group/user/id/:id', userGroupChats);
router.get('/group/name/:name', getGroupByname);
router.get('/group/id/:id', getGroupById);
router.get('/find/:firstId/:secondId', findChat);
router.get('/:userId', userChats);

export default router