import Express from "express";
import Cors from 'cors'; 
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasProductos from './views/productos/rutas.js';
import jwt from 'express-jwt';//importacion api aut
import jwks from 'jwks-rsa';//importacion api aut
import rutasVenta from './views/ventas/rutas.js';

dotenv.config({path: './.env'});
const app = Express();

app.use(Express.json());
app.use(Cors());

//implementacion de la api aut0


app.use(rutasUsuario);
app.use(rutasProductos);
app.use(rutasVenta);
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://protic.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-petshop',
  issuer: 'https://protic.us.auth0.com/',
  algorithms: ['RS256']
});
//implementacion api
app.use(jwtCheck);


const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);
