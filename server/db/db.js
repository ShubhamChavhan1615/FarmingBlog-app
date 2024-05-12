import mongoose  from "mongoose";

export const connectDB = await mongoose.connect("mongodb://localhost:27017/FarmBlog")
// export const connectDB = await mongoose.connect("mongodb+srv://shubhamchav1615:shubham123@cluster0.55dzipe.mongodb.net/FarmBlog")
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})
