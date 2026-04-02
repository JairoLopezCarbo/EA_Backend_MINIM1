import express from 'express';
import controller from '../controllers/Auth';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: auth
 *     description: Authentication endpoints
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "judit@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login correcto
 *       401:
 *         description: Credenciales incorrectas
 *       422:
 *         description: Validation failed
 */
router.post('/login', ValidateJoi(Schemas.Auth.login), controller.login);

export default router;
