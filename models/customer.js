const Joi = require("joi");
const mongoose = require("mongoose");

const Customer =mongoose.model("Customer",new mongoose.Schema({
    name : {
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:50
    },
    isGold:{
        type:Boolean,
        required:true
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10).max(50).required(),
        isGold: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
}
exports.validate=validateCustomer;
exports.Customer = Customer;