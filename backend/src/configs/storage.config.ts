import mongoose from "mongoose";
import multer from "multer";
import ENV from "../../env.json";
import Grid from "gridfs-stream";
import GridFsStorage from "multer-gridfs-storage";
import { HTTP_FILE_EXISTS } from "../constants/http_status";

let gfs: Grid.Grid;

mongoose.connection.once(
    "open",
    function () {
        gfs = Grid(mongoose.connection.db, mongoose.mongo);
        gfs.collection("uploads");
        console.log("GridFS initialized!");

        return gfs;
    }
)

const storage = new GridFsStorage({
    url: ENV.MONGO_URI,
    file: async (req, file) => {
        return new Promise(async (resolve, reject) => {
            const fileInfo = {
                filename: file.originalname, 
                bucketName: 'uploads'
            };
            
            gfs.files.findOne({filename: file.originalname}, function (err, record) {
                
                if (err) {
                    return reject(err);
                }

                if (record) {
                    return reject(HTTP_FILE_EXISTS);
                } else {
                    console.log("ADD FILE");
                    console.log(file);
                    resolve(fileInfo);
                }
                
            });
        });
    }
});

const upload = multer({ storage });

export default upload;
export { gfs };