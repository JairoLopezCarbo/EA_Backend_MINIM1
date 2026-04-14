import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IColeccion {
    route_ids: Types.ObjectId[];
    route_labels: string[];
}

export interface IColeccionModel extends IColeccion, Document {}

const ColeccionSchema: Schema = new Schema(
    {
        route_ids: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Route',
                required: true
            }
        ],
        route_labels: { type: [String], required: true }
    },

    {
        timestamps: false,
        versionKey: false,
        id: false,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

export default mongoose.model<IColeccionModel>('Coleccion', ColeccionSchema);