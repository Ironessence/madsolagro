import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';


const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

const PAGE_SIZE = 3;
productRouter.get('/search', 
expressAsyncHandler(
async (req, res) => {
    const {query} = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const categorie = query.categorie || '';
    const price = query.price || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
    searchQuery && searchQuery !== 'all'
    ? {
        nume: {
            $regex: searchQuery,
            $options: 'i',
        },
    }
    : {};
    const categoryFilter = 
    categorie && categorie !== 'all' ? {categorie} : {};
    
    const priceFilter = 
    price && price !== 'all'
    ? {
        pret: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
        }
    }
    : {};
    const sortOrder = 
    order === 'lowest'
    ? {pret: 1}
    : order === 'highest'
    ? {pret: -1}
    : order === 'newest'
    ? {createdAt: -1}
    : {_id: -1};


    const products = await Product.find({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        
    })
        .sort(sortOrder)
        .skip(pageSize * (page - 1))
        .limit(pageSize);

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter
        });
    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize),
    });
})
);

productRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('categorie');
        res.send(categories);
    })
);

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: "Produsul nu exista"});
    }
    
});

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: "Produsul nu exista"});
    }
    
});

export default productRouter;