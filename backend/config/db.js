import mongoose from "mongoose"
import colors from "colors"


const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgMagenta.white)
    } catch (err) {
        console.log(`Error in MongoDb ${err}`.bgRed.white)
    }
}

export default connectdb