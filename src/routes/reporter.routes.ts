import {Router} from 'express'
import {sendStock, sendTransaccion,testing} from "../controllers/repoter.controller";

const router = Router();
router.post('/sendStock', sendStock);
router.post('/sendTransaccion', sendTransaccion);
router.get('/testing', testing);
export default router;
