import mongoose from "mongoose";

type ConnectionObject  = {
    isConnected?: number
}

const connection: ConnectionObject = {};

// this function will connect to database if it is not already connected
 async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI + "/nextjs" || '');
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to database");
    } catch (error) {
        console.error("Cannot connect with mongoDB", error);
        process.exit(1);
    }
}

export default dbConnect;