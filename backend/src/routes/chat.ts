// backend/src/routes/chat.ts
import { Router } from 'express';
import { getMessages, postMessage } from '../controllers/chatController';

const router = Router();

router.get('/messages', getMessages);
router.post('/message', postMessage);

export default router;
