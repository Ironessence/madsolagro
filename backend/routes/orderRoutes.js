import express from 'express';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';


const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin,
expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
}));

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({message: 'New Order Created', order});
}));

orderRouter.get(
    '/summary',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ]);
        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);
        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: {format: '%d-%m-%Y', date: '$createdAt'}},
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalPrice' },
                }
            }, 
            { $sort: { _id: 1 }},
        ])
        res.send({users, orders, dailyOrders});
    })
);

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({user: req.user._id});
        res.send(orders);
    })
);

orderRouter.get(
    '/:id', 
    isAuth, 
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if(order) {
            res.send(order);
        } else {
            res.status(404).send({message: "Comanda nu a fost gasita"})
        }
}));

orderRouter.delete(
    '/:id',
    isAuth, isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if(order) {
            await order.remove();
            res.send({message: 'Comanda a fost ștearsă!'})
        } else {
            res.status(404).send({message: "Comanda nu a fost gasita!"});
        }
    })
);


export default orderRouter;