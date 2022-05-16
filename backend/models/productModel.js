import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        nume: { type: String, required: true, unique: true},
        slug: { type: String, required: true, unique: true},
        imagine: {type: String, required: true},
        categorie: {type: String, required: true},
        descriere: {type: String, required: true},
        pret: {type: Number, required: true},
        inStoc: {type: Number, required: true},
        reducere: {type: String, required: false},
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;