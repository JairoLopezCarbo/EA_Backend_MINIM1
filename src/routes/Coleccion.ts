import express from 'express';
import controller from '../controllers/Coleccion';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: colecciones
 *     description: CRUD endpoints for Colecciones
 *
 * components:
 *   schemas:
 *     Coleccion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         route_ids:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Route'
 *         route_labels:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Ruta centro", "Ruta costa"]
 *
 *     ColeccionCreate:
 *       type: object
 *       required:
 *         - route_ids
 *         - route_labels
 *       properties:
 *         route_ids:
 *           type: array
 *           items:
 *             type: string
 *             example: "65f1c2a1b2c3d4e5f6789012"
 *         route_labels:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Ruta centro", "Ruta costa"]
 *
 *     ColeccionUpdate:
 *       type: object
 *       properties:
 *         route_ids:
 *           type: array
 *           items:
 *             type: string
 *             example: "65f1c2a1b2c3d4e5f6789012"
 *         route_labels:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Ruta centro", "Ruta costa"]
 */

/**
 * @openapi
 * /colecciones:
 *   get:
 *     summary: List all Colecciones
 *     tags: [colecciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [10, 25, 50]
 *         description: Page size. Use together with page to enable pagination.
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number. Use together with limit to enable pagination.
 *     responses:
 *       200:
 *         description: OK. If limit and page are omitted, returns the full list.
 *       401:
 *         description: Unauthorized
 */
router.get('/', controller.readAll);

/**
 * @openapi
 * /colecciones/{coleccionId}:
 *   get:
 *     summary: Get a Coleccion by ID
 *     tags: [colecciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coleccionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Coleccion ObjectId
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:coleccionId', controller.readColeccion);

/**
 * @openapi
 * /colecciones:
 *   post:
 *     summary: Create a Coleccion
 *     tags: [colecciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ColeccionCreate'
 *     responses:
 *       201:
 *         description: Created
 *       422:
 *         description: Validation failed (Joi)
 *       401:
 *         description: Unauthorized
 */
router.post('/', ValidateJoi(Schemas.Coleccion.create), controller.createColeccion);

/**
 * @openapi
 * /colecciones/{coleccionId}:
 *   put:
 *     summary: Update a Coleccion by ID
 *     tags: [colecciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coleccionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Coleccion ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ColeccionUpdate'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 *       422:
 *         description: Validation failed (Joi)
 *       401:
 *         description: Unauthorized
 */
router.put('/:coleccionId', ValidateJoi(Schemas.Coleccion.update), controller.updateColeccion);

/**
 * @openapi
 * /colecciones/{coleccionId}:
 *   delete:
 *     summary: Delete a Coleccion by ID
 *     tags: [colecciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coleccionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Coleccion ObjectId
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:coleccionId', controller.deleteColeccion);

export default router;
