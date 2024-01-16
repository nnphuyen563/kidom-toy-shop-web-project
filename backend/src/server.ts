import express from "express";
import cors from "cors";
import bodyPaser from "body-parser";
import { NextFunction, Request, Response } from 'express';
import { HTTP_FILE_EXISTS } from "./constants/http_status";

const app = express();

app.use(bodyPaser.json({limit:"50mb"}));
app.use(bodyPaser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}));
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

import { dbConnect } from "./configs/database.config";
dbConnect();

import productRouter from './routers/product.router';
import userRouter from './routers/user.router';

import ENV from '../env.json';

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || ENV.PORT;

var server = app.listen(
    Number.parseInt(PORT), 
    "0.0.0.0", 
    () => {
    console.log(`Server is running on port ` + PORT);
})

server.timeout = 1000000;
server.setTimeout(1000000);