import { Schema, model } from "mongoose";

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string[];
    description: string;
    star: number;
    brand: string; 
    stock: number;
    time: Date;
}

export const ProductSchema = new Schema<Product>(
    {
        id: {type: String, required:true},
        name: {type: String, required:true},
        price: {type: Number, required:true},
        category: {type: String, required:true},
        imageUrl: {type: [String], required:true},
        description: {type: String, required:false},
        star: {type: Number, required:true},
        brand: {type: String, required:false},
        stock: {type: Number, required:true},
        time: {type: Date, required:true},
    }, {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
)

export const ProcductModel = model<Product>('product', ProductSchema);