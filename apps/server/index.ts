import express from 'express';
import dotenv from 'dotenv';
import router from './routs';


dotenv.config();

export const app = express();
app.use(express.json());



import cors from "cors";

app.use(cors({
  origin: [
    "https://tivolibot-client.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));




app.use(router);

//Set the port 
const port = process.env.PORT || 3000;










//Start the server 
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });
// }


// Example route
app.get("/", (req, res) => {
  res.send("🚀 Server is running on Render!");
});

// Important: Keep the process alive by listening on the Render port
app.listen(port, () => {
  console.log(`✅ Server is live on port ${port}`);
});