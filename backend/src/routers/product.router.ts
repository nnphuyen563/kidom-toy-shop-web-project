import { Router } from "express";
import { CATAGORYS } from "../data";
import PRODUCTS from "../data";
import asyncHandler from "express-async-handler";
import { ProcductModel, Product } from "../models/product.model";
import upload, { gfs } from "../configs/storage.config";
import { HTTP_FILE_EXISTS } from "../constants/http_status";

const router = Router();

function getAll(products: Product[]) {
    var data = [];

    for (var item of products) {
        for (var img of item.imageUrl) {
            var temp = JSON.parse(JSON.stringify(item));
            temp.imageUrl = img;

            data.push(temp);
        }
    }

    return data;
}

router.get("/seed", asyncHandler(
    async (req, res) => {
        const productCount = await ProcductModel.countDocuments();
        
        if (productCount > 0) {
            res.send("Seed is already done!");
            return
        }
        
        await ProcductModel.create(PRODUCTS);
        res.send("Seed is done!");
    })
)

router.get("/", asyncHandler(
    async (req, res) => {
        const data = await ProcductModel.find();
        res.send(getAll(data));
    }
))
router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchTerm = req.params.searchTerm;
        const searchRegex = new RegExp(searchTerm, 'i');
        
        const data = await ProcductModel.find(
            {name: {$regex: searchRegex}}
        );

        const products = getAll(data).filter(product => (product.imageUrl || '').includes('_thumb.'));

        res.send(products);
    }
))
router.get("/category", (req, res) => {
    res.send(CATAGORYS);
})

router.get("/category/:catagoryName", asyncHandler (
    async (req, res) => {
        const searchTerm = req.params.catagoryName;
        const searchRegex = new RegExp(searchTerm, 'i');

        const data = await ProcductModel.find(
            {category: {$regex: searchRegex}}
        );

        const products = getAll(data).filter(product => (product.imageUrl || '').includes('_thumb.'));
        res.send(products);
    }
))

router.get("/thumb", asyncHandler(
    async (req, res) => {
        const data = await ProcductModel.find();
        const img_thumb = getAll(data).filter(product => product.imageUrl.includes('_thumb.'));    
        res.send(img_thumb);
    }
))

router.get("/thumb/:id", asyncHandler(
    async (req, res) => {
        const id = req.params.id;
        //const thumb = req.params.thumb;
        const data = await ProcductModel.find();
        const img_thumb = getAll(data).filter(product => product.id === id && product.imageUrl.includes('_thumb.'))[0];    
        
        res.send(img_thumb);
    }
))

router.get("/:id", asyncHandler (
    async (req, res) => {
        const id = req.params.id;
        const data = await ProcductModel.find();
        const product = getAll(data).filter(product => (product.id.toString() === id));
        res.send(product);
    }
))

router.post("/image/upload", upload.single("file"), asyncHandler(
    async (req, res) => {
        res.json({msg: "Uploaded image"});
    }
));

router.get("/image/:filename", asyncHandler(
    async (req, res) => {
        const filename = req.params.filename;
        gfs.files.findOne({filename: filename}, function (err, file) {
            if (!file || file.length === 0) {
                return res.status(404).send("File not found");
            }

            var readStream = gfs.createReadStream(file.filename);

            var bufs: any[] = [];
            
            readStream.on('data', function(chunk) {

                bufs.push(chunk);
            
            }).on('end', function() { // done
            
                var fbuf = Buffer.concat(bufs);
            
                var base64 = (fbuf.toString('base64'));
            
                res.json({img: 'data:image/png;base64,' + base64});
            });
        })
    }
));

router.post("/upload", asyncHandler(
    async (req, res) => {

        console.log(req.body);

        const found = await ProcductModel.exists(
            {id: req.body.id}
        );

        if (found) {
            res.status(HTTP_FILE_EXISTS).send("Product exists");
        } else {
            await ProcductModel.create({
                id: req.body.id,
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                imageUrl: req.body.imgUrls,
                description: req.body.description,
                star: req.body.star,
                brand: req.body.brand,
                stock: req.body.stock,
                time: new Date(),
            });
            res.json({msg: "Uploaded product"});
        }

    }
));

router.get("/delete/:id", asyncHandler(
    async (req, res) => {
        const id = req.params.id;
        await ProcductModel.deleteOne({id: id});
        res.json({msg: "Deleted product"});
    }
));

router.get("/image/delete/:filename", asyncHandler(
    async (req, res) => {
        const filename = req.params.filename;
        gfs.remove({filename: filename, root: "uploads"}, function (err: Error) {
            if (err) {
                res.status(404).send("File not found");
            }

            res.json({msg: "Deleted image"});
        });
    }
));

// router.post("/upload", upload.array("images"), asyncHandler(
//     async (req, res) => {
//         res.json({file: req.file});
//     }
// ));

export default router;