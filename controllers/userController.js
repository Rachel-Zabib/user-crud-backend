let userModel=require("../models/userModel")
let axios=require("axios");

exports.getAllUsers= async (req,res)=>{
    try{
        let users=await userModel.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send(err.message)
    }
}

exports.getOneUser=async (req,res)=>{
    try{
        let user=await userModel.findById(req.params.id).exec();
        res.send(user);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}
exports.addUser=async (req,res)=>{
    try{
        let user=await userModel.create(req.body);
        res.send(user);
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

exports.updateUser=async (req,res)=>{
    try{
        let user=await userModel.findOneAndUpdate({_id:req.params.id,disabled:false},req.body,{ new: true })
        res.send(user);//The user will be NULL when the id does not exist or cannot be changed
    }
    catch(err){
        res.status(400).send(err.message);
    }

    // try{
    //     let user=await userModel.findById(req.params.id).exec();
    //     if(user.disabled){
    //        return res.status(400).send("Do not allow update users that were fetched from the remote server");
    //     }
    //     user=await userModel.findByIdAndUpdate(req.params.id,req.body,{ new: true })
    //     res.send(user);
    // }
    // catch(err){
    //     res.status(400).send(err.message);
    // }
}

exports.deleteUser=async (req,res)=>{
    
    try{
        let user=await userModel.findOneAndDelete({_id:req.params.id,disabled:false})
        res.send(user);//The user will be NULL when the id does not exist or cannot be changed
    }
    catch(err){
        res.status(400).send(err.message);
    }
    // try{
    //     let user=await userModel.findById(req.params.id).exec();
    //     if(user.disabled){
    //        return res.status(400).send("Do not allow delete users that were fetched from the remote server");
    //     }
    //     user=await userModel.findByIdAndDelete(req.params.id);
    //     res.send(user);
    // }
    // catch(err){
    //     res.status(400).send(err.message);
    // }
}


exports.initUsers=async (req,res)=>{
    try{
       let response= await axios.get("https://raw.githubusercontent.com/cyrencloud/home-assignment/main/users.json");
       let usersToInit=response.data;
       usersToInit=usersToInit.map((v,i)=>{
           v.disabled=true;
           return v;
       })
       let users=await userModel.create(usersToInit)
       return res.send(users)
    }
    catch(err){
       return res.status(400).send(err.message);
    }
}
