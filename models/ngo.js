import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
    name : {type:String , required:true, unique:true},
    email : {type:String , required:true, unique:true},
    password: {type:String, required:true},
    projects: [{type:mongoose.Schema.Types.ObjectId,
               ref: 'Project'
    }],
    clubName: { type: String, required: true }, // New field for club name
    logo: { type: String }, // Optional field for image URL

})

const Ngo = mongoose.model('Ngo', ngoSchema);

export default Ngo;