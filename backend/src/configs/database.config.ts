import { connect } from "mongoose";
import ENV from '../../env.json';

export const dbConnect = async () => {
    await connect(ENV.MONGO_URI!).then(
        () => console.log("Connect MongoDB sucessfully!"),
        (error) => console.log(error)
    )
}   