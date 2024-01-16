import { Router } from "express";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { USER } from "../data";
import jwt from 'jsonwebtoken';
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/", asyncHandler(
    async (req, res) => {
        const data = await UserModel.find();
        res.send(data);
    }
))

router.get("/seed", asyncHandler(
    async (req, res) => {
        const productCount = await UserModel.countDocuments();
        
        if (productCount > 0) {
            res.send("Seed is already done!");
            return
        }
        
        await UserModel.create(USER);
        res.send("Seed is done!");
    })
)

router.post("/register", asyncHandler(
    async (req, res) => {
        const {name, email, password, phone} = req.body;

        const user = await UserModel.findOne({'email': email});

        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send('Email đã tồn tại! Hãy nhập email khác!');
            return;
        }

        const newUser:User = {
            name: name,
            email: email,
            password: password,
            isAdmin: false,
            phone: phone
        }

        const dbUser = await UserModel.create(newUser);
        res.send(genTokenRes(newUser));
    }
))

router.post("/login", asyncHandler (
    async (req, res) => {
        console.log(req.body);

        const {email, password} = req.body;
        const user = await UserModel.findOne({'email': email, 'password': password});
        
        if (user) {
            res.send(genTokenRes(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send("Tên đăng nhập hoặc mật khẩu không đúng!")
        }
    }
))

const genTokenRes = (user: any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "Nhom04", {
        expiresIn: "30d"
    });

    user.token = token;

    return user;
}


export default router;