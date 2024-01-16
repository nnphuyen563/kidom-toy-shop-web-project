import { Timestamp } from "rxjs";
import { Image } from "./Image";

export class Product {
    id!: string;
    name!: string;
    price!: number;
    category!: string;
    imageUrl!: string;
    imageHTML?: string;
    description?: string = "";
    brand?: string; 
    stock!: number;
    time!: Date;
    quantity!: number;
    star!: number;
    imgUrls?: string[] = [];
}




