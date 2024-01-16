import { User } from "./models/user.model";
import { toDates } from "ts-transformer-dates";

const productPath = 'assets/img/product/'
const catagoryPath ='assets/img/catagory/'

export const CATAGORYS: any[] = [
    {
        imageUrl: catagoryPath + 'action.jpg',
        name: "Hành động",
    },
    {
        imageUrl: catagoryPath + 'art.jpg',
        name: "Mỹ thuật"
    },
    {
        imageUrl: catagoryPath + 'boardgame.jpg',
        name: "Board Game",
    },
    {
        imageUrl: catagoryPath + 'collect.jpg',
        name: "Bộ sưu tập"
    },
    {
        imageUrl: catagoryPath + 'doll.jpg',
        name: "Búp bê",
    },
    {
        imageUrl: catagoryPath + 'outdoor.jpg',
        name: "Trò chơi ngoài trời"
    }
]

// export const PRODUCTS: any[] = [
//     {
//         imgURL: ["1_thumb.png", "1b.jpg", "1c.png", "1d.jpg"].map(img => productPath + img),
//         name: "Bộ lưới và bóng bóng rổ Nerf Sports Nerfoop",
//         category: 'ĐỒ CHƠI NGOÀI TRỜI',
//         price: 250000,
//         id: 1,
//         description: 'Description of product 1',
//         star: 4,
//         stock: 50,
//         time: new Date(),
//         quantity: 10
//     }
// ];

export const USER: User[] = [
    {
        email: "tuanna21411@st.uel.edu.vn",
        password: "anhtuan716",
        name: "Nguyen Anh Tuan",
        isAdmin: false,
        phone: "0123456789",
    },
    {
        email: "admin@gmail.com",
        password: "admin123",
        name: "Nguyen Anh Tuan",
        isAdmin: true,
        phone: "0123456789",
    }
]

import DATA from '../data/product.json';
import { Product } from "./models/product.model";

const PRODUCTS: Product[] = (DATA as unknown as Product[]);

PRODUCTS.forEach(product => {
    product.time = new Date(product.time);
    product.imageUrl = product.imageUrl.map(img => String(productPath + img));
});

console.log(PRODUCTS[0]);

export default PRODUCTS;