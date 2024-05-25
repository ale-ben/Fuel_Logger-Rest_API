import swaggerAutogen from 'swagger-autogen';
import packageJson from './package.json' with { type: "json" };

const doc = {
    info: {
        title: 'Fuel Logger',
        version: packageJson.version
    },
    host: 'localhost:3000'
};

const outputFile = './docs/swagger-output.json';
const routes = ['./src/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);