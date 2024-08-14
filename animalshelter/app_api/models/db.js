const mongoose = require('mongoose');
//const host = process.env.DB_HOST || 'localhost:27017';
//const dbURI = `mongodb://${host}/animals`;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animals'
const readLine = require('readline');

const connect = () =>{
    setTimeout(() => mongoose.connect(dbURI, {

    }), 1000);
}

//Monitor the connection
mongoose.connection.on('connected', ()=>{
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error: ', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose disconnected');
});

//Listen for windows platform
if(process.platform === 'win32'){
    const r1 =readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', ()=> {
        process.emit("SIGINT");
    });
}

//Configure graceful shutdown
const gracefulShutdown = (msg) =>{
    mongoose.connection.close(()=>{
        console.log(`Mongoose disconnected through ${msg}`);
    });
};

//Event listeners for graceful shutdown
//shutdown by nodemon
process.once('SIGUSR2', ()=>{
    gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

//Shutdown started by app termination
process.on('SIGINT', ()=>{
    gracefulShutdown('aoo ternubatuib');
    process.exit(0);
});

//Shutdown by container termination
process.on('SIGTERM', ()=>{
    gracefulShutdown('app shutdown');
    process.exit(0);
});

//make connection
connect();

//bring in the schema
require('./animals');
module.exports = mongoose;