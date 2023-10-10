// Importar express y cors
import express from "express";
import cors from "cors";
const app = express();

// para manejar variables de ambiente
import * as dotenv from "dotenv";
dotenv.config();

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
    res.json({ ok: true, result: "Acceso desde Render" });
});