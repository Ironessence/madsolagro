import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';



dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('connected to db')
})  
    .catch(err => {
    console.log(err.message);
})

const app = express();
app.use('/api/seed', seedRouter);


app.get('/api/produse', (req, res) => {
    res.send(data.produse);
});

app.get('/api/produse/slug/:slug', (req, res) => {
    const product = data.produse.find(x => x.slug === req.params.slug);
    if(product) {
        res.send(product);
    } else {
        res.statusMessage(404).send({message: "Produsul nu exista"});
    }
    
});

app.get('/api/produse/:id', (req, res) => {
    const product = data.produse.find(x => x._id === req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.statusMessage(404).send({message: "Produsul nu exista"});
    }
    
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});