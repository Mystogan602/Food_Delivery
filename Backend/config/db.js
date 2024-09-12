import mongoose from "mongoose";

export const connectDB = async() => {
    mongoose.connect('mongodb+srv://tienphamminh136:136651609@cluster0.yd24e.mongodb.net/food-delivery')
    .then(() => console.log('Database connection established'))
    .catch(() => console.log('Database connection failed'))
};