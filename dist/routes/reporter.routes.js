"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repoter_controller_1 = require("../controllers/repoter.controller");
const router = express_1.Router();
router.post('/sendStock', repoter_controller_1.sendStock);
router.post('/sendTransaccion', repoter_controller_1.sendTransaccion);
router.get('/testing', repoter_controller_1.testing);
exports.default = router;
