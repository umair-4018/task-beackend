import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import "./dataBase/config.js";
dotenv.config(); 
const app = express();
const port = process.env.PORT ;
app.use(express.json()); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
