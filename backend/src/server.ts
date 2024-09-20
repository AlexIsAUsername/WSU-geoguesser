import express, { Express, Application, NextFunction } from "express";
import cors from 'cors';
import routes from "./routes"
const app: Application = express();

app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(4000, '0.0.0.0', () => { console.log('backend TP server is running on http://localhost:4000') })
