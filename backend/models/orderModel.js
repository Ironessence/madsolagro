import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
            slug: {type: String, required: true},
            nume: {type: String, required: true},
            quantity: {type: Number, required: true},
            imagine: {type: String, required: true},
            pret: {type: Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
        ],
        shippingAddress: {
            fullName: {type: String, required: true},
            address: {type: String, required: true},
            city: {type: String, required: true},
            postalCode: {type: Number, required: true},
            phoneNumber: {type: Number, required: true},
        },
        itemsPrice: {type: Number, required: true},
        shippingPrice: {type: Number, required: true},
        totalPrice: {type: Number, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        paidAt: {type: Date},
        isDelivered: {type: Boolean, default: false},
        deliveredAt: {type: Date},
        
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;