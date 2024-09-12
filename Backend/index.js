import express from 'express';
import cors from 'cors';


// app configuration
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Api working')
});

app.listen(port, ()=> {
    console.log(`listening on http://localhost:${port}`);
});