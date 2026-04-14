import { NextFunction, Request, Response } from 'express';
import ColeccionService from '../services/Coleccion';
import RouteService from '../services/Route';
import { parsePagination } from '../library/Pagination';
import { AuthRequest } from '../middleware/auth';

const validateRouteIds = async (routeIds: string[]) => {
    for (const routeId of routeIds) {
        const route = await RouteService.getRoute(routeId);
        if (!route) {
            return routeId;
        }
    }

    return null;
};

const createColeccion = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const routeIds = req.body.route_ids ?? [];

        const invalidRouteId = await validateRouteIds(routeIds);
        if (invalidRouteId) {
            return res.status(422).json({ message: `route_id ${invalidRouteId} does not exist` });
        }


        const savedColeccion = await ColeccionService.createColeccion({
            ...req.body,
            route_ids: routeIds
        });

        return res.status(201).json(savedColeccion);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readColeccion = async (req: Request, res: Response, next: NextFunction) => {
    const coleccionId = req.params.coleccionId ?? req.params.ColeccionId;

    try {
        const coleccion = await ColeccionService.getColeccion(coleccionId);
        return coleccion    
            ? res.status(200).json(coleccion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pagination = parsePagination(req.query);
        const colecciones = await ColeccionService.getAllColecciones(pagination);
        return res.status(200).json(colecciones);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateColeccion = async (req: Request, res: Response, next: NextFunction) => {
    const coleccionId = req.params.coleccionId ?? req.params.ColeccionId;

    try {
        const data = { ...req.body };
        delete data.userId;

        if (Array.isArray(data.route_ids)) {
            const invalidRouteId = await validateRouteIds(data.route_ids);
            if (invalidRouteId) {
                return res.status(422).json({ message: `route_id ${invalidRouteId} does not exist` });
            }
        }

        const updatedColeccion = await ColeccionService.updateColeccion(coleccionId, data);
        return updatedColeccion
            ? res.status(200).json(updatedColeccion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteColeccion = async (req: Request, res: Response, next: NextFunction) => {
    const coleccionId = req.params.coleccionId ?? req.params.ColeccionId;

    try {
        const deletedColeccion = await ColeccionService.deleteColeccion(coleccionId);
        return deletedColeccion
            ? res.status(200).json(deletedColeccion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default {
    createColeccion,
    readColeccion,
    readAll,
    updateColeccion,
    deleteColeccion
};