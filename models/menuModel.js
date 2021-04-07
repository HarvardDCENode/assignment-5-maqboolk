const mongoose = require("mongoose");

//get access to Schema constructor
const Schema = mongoose.Schema;

//create a new menu schema 
const schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: String, required: false },
    available: { type: Boolean, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }

});

schema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    } else {
        this.updatedAt = new Date();
    }
    next();
});

// exporting model with name and schema
module.exports = mongoose.model('Menu', schema);