import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Route from '../models/Route';
import Logging from '../library/Logging';

dotenv.config();

type SeedRoute = {
    _id: string;
    title?: string;
    description: string;
    city: string;
    country: string;
    distance?: number;
    duration?: number;
    difficulty: 'easy' | 'medium' | 'hard';
    tags?: string[];
    image?: string;
    userId: string;
};

const SEED_ROUTES: SeedRoute[] = [
    {
        _id: '66f000000000000000000001',
        userId: '65f000000000000000000078',
        difficulty: 'medium',
        city: 'Galicia',
        country: 'Spain',
        description: 'Ruta en familia por galicia',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f000000000000000000002',
        userId: '65f00000000000000000007a',
        difficulty: 'medium',
        city: 'Galicia',
        country: 'Spain',
        description: 'Ruta de desconexion por galicia',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f000000000000000000003',
        userId: '65f00000000000000000007b',
        difficulty: 'medium',
        city: 'Galicia',
        country: 'Spain',
        description: 'Ruta con amigos por galicia',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f000000000000000000004',
        userId: '65f0000000000000000000c8',
        difficulty: 'medium',
        city: 'Valencia',
        country: 'Spain',
        description: 'Redescubre la belleza de Valencia',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f000000000000000000005',
        userId: '65f0000000000000000000c8',
        difficulty: 'medium',
        city: 'Valencia',
        country: 'Spain',
        description: 'Despedida de soltero en Valencia',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f000000000000000000006',
        userId: '65f0000000000000000000aa',
        difficulty: 'medium',
        city: 'Valencia',
        country: 'Spain',
        description: 'Visita Valencia con ninos',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f000000000000000000007',
        userId: '65f0000000000000000000a0',
        difficulty: 'medium',
        city: 'Sevilla',
        country: 'Spain',
        description: 'Sevilla con encanto',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f000000000000000000008',
        userId: '65f0000000000000000000a0',
        difficulty: 'medium',
        city: 'Sevilla',
        country: 'Spain',
        description: 'Monumentos de Sevilla',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f000000000000000000009',
        userId: '65f0000000000000000000a3',
        difficulty: 'medium',
        city: 'Sevilla',
        country: 'Spain',
        description: 'De fiesta por sevilla',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f00000000000000000000a',
        userId: '65f000000000000000000098',
        difficulty: 'easy',
        city: 'Madrid',
        country: 'Spain',
        description: 'Madrid en blanco y negro',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f00000000000000000000b',
        userId: '65f00000000000000000009d',
        difficulty: 'easy',
        city: 'Madrid',
        country: 'Spain',
        description: 'Madrid modernista',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f00000000000000000000c',
        userId: '65f000000000000000000098',
        difficulty: 'hard',
        city: 'Madrid',
        country: 'Spain',
        description: 'Madrid en color',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f00000000000000000000d',
        userId: '65f000000000000000000099',
        difficulty: 'easy',
        city: 'Barcelona',
        country: 'Spain',
        description: 'Gaudi por un dia',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f00000000000000000000e',
        userId: '65f0000000000000000000a8',
        difficulty: 'easy',
        city: 'Barcelona',
        country: 'Spain',
        description: 'Anochecer en Montjuic',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    },
    {
        _id: '66f00000000000000000000f',
        userId: '65f00000000000000000009d',
        difficulty: 'easy',
        city: 'Barcelona',
        country: 'Spain',
        description: 'Los encantos de Pedralbes',
        title: '',
        distance: undefined,
        duration: undefined,
        tags: [],
        image: ''
    }
];

const ALLOWED_DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

function validateSeedRoutes(routes: SeedRoute[]) {
    routes.forEach((route, index) => {
        if (!ALLOWED_DIFFICULTIES.has(route.difficulty)) {
            throw new Error('Ruta invalida en posicion ' + index);
        }

        if (!OBJECT_ID_REGEX.test(route.userId)) {
            throw new Error('userId invalido en posicion ' + index);
        }

        if (!OBJECT_ID_REGEX.test(route._id)) {
            throw new Error('_id invalido en posicion ' + index);
        }
    });
}

function isCompleteRoute(route: SeedRoute): boolean {
    const hasRequiredStrings =
        !!route.title &&
        !!route.description &&
        !!route.city &&
        !!route.country &&
        !!route.userId;

    const hasRequiredNumbers =
        typeof route.distance === 'number' &&
        typeof route.duration === 'number';

    return hasRequiredStrings && hasRequiredNumbers;
}

function mapToInsertableRoute(route: SeedRoute) {
    return {
        _id: route._id,
        title: route.title && route.title.trim().length > 0 ? route.title : ' ',
        description: route.description && route.description.trim().length > 0 ? route.description : ' ',
        city: route.city && route.city.trim().length > 0 ? route.city : ' ',
        country: route.country && route.country.trim().length > 0 ? route.country : ' ',
        distance: typeof route.distance === 'number' ? route.distance : 0,
        duration: typeof route.duration === 'number' ? route.duration : 0,
        difficulty: route.difficulty,
        tags: route.tags || [],
        image: route.image,
        userId: route.userId
    };
}

async function seedRoutes() {
    try {
        const MONGO_URL = process.env.MONGO_URI || '';
        if (!MONGO_URL) {
            throw new Error('MONGO_URI no esta configurado en .env');
        }

        await mongoose.connect(MONGO_URL, { retryWrites: true, w: 'majority' });
        Logging.info('Conexion a MongoDB establecida');

        await Route.deleteMany({});
        Logging.info('Coleccion de rutas vaciada');

        validateSeedRoutes(SEED_ROUTES);

        if (!SEED_ROUTES.length) {
            Logging.info('No hay rutas definidas en SEED_ROUTES');
            process.exit(0);
        }

        const routesToInsert = SEED_ROUTES.map(mapToInsertableRoute);
        const result = await Route.insertMany(routesToInsert);
        Logging.info('' + result.length + ' rutas creadas correctamente');

        process.exit(0);
    } catch (error) {
        Logging.error(`Error al crear rutas: ${error}`);
        process.exit(1);
    }
}

seedRoutes();