import express from 'express';
import dotenv from 'dotenv';
import router from './routs';


dotenv.config();

export const app = express();
app.use(express.json());
app.use(router);

//Set the port 
const port = process.env.PORT || 3000;



//Start the server 
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}