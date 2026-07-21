const mongoose = require("mongoose");

async function connectMdB(url){
    return mongoose.connect(url);
}

module.exports = {
    connectMdB
}