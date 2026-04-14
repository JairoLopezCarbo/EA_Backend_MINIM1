import Coleccion, { IColeccion } from '../models/Coleccion';

type PaginationLimit = 10 | 25 | 50;

type PaginationParams = {
    limit: PaginationLimit;
    page: number;
};

type PaginatedResult<T> = {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

type ListResult<T> = PaginatedResult<T> | T[];

const createColeccion = async (input: IColeccion) => {
    const coleccion = new Coleccion(input);
    return await coleccion.save();
};

const getColeccion = async (coleccionId: string) => {
    return await Coleccion.findById(coleccionId).exec();
};

const getAllColecciones = async (pagination?: PaginationParams): Promise<ListResult<IColeccion>> => {
    if (!pagination) {
        return await Coleccion.find().sort({ _id: 1 }).exec();
    }

    const { limit, page } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        Coleccion.find().sort({ _id: 1 }).skip(skip).limit(limit).exec(),
        Coleccion.countDocuments()
    ]);
    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const updateColeccion = async (coleccionId: string, input: Partial<IColeccion>) => {
    return await Coleccion.findByIdAndUpdate(coleccionId, input, { new: true }).exec();
};

const deleteColeccion = async (coleccionId: string) => {
    return await Coleccion.findByIdAndDelete(coleccionId).exec();
};

export default {
    createColeccion,
    getColeccion,
    getAllColecciones,
    updateColeccion,
    deleteColeccion
};