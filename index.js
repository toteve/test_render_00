// Importar express y cors
import express from "express";
import cors from "cors";
const app = express();

// para manejar variables de ambiente
import * as dotenv from "dotenv";
dotenv.config();

// La clase Pool nos permite soportar multiconexiones y un mejor rendimiento en las consultas desde paquete pg
import pkg from 'pg';
const { Pool } = pkg;

// definimos el objeto de conexion pool para una bd local
/* const pool = new Pool({
    host: 'localhost',  
    user: 'postgres',
    password: '1234',  
    database: 'plan_de_viajes', 
    port: 5433,
    allowExitOnIdle: true  
})
 */

// definimos el objeto de conexion pool para una bd remota desde render, si estamos en desarrollo se 
// usa la externa, en produccion la interna, ambas las otorga RENDER
/* const pool = new Pool({
    connectionString:'postgres://tote:WlZnxlhCyYyNNQv9GfnxvYADGNLsj6zw@dpg-ckirgrcl4vmc73838nng-a.oregon-postgres.render.com/plan_de_viajes',
    ssl: true

})
 */

// si va a usar variables de entorno 
// connectionString: process.env.DATABASE_URL_EXTERNA (EN DESARROLLO)
/* const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true

}) */

// si va a usar variables de entorno 
// connectionString: process.env.DATABASE_URL (en PRODUCCION no necesita ssl)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})





// importar manejador de errores y modulos propios
//import { handleErrors } from "./database/errors.js";
//import { agregarViaje, verViajes, unViaje } from './database/consultas.js';



// middleware de cors y de parseo del body
app.use(cors());
app.use(express.json());


// levantando servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server en puerto: http://localhost:${PORT}`);
})

//rutas del enrutador/ Api Rest, enlazar ruta con funcion BD

//0. GET para ver ruta raiz
app.get("/", (req, res) => {
    res.json({ ok: true, result: "Acceso desde Render con BD" });
});

//0. GET para obtener hora de una bd postgre desde render
app.get("/hora", async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    return res.json(result.rows[0]);
});