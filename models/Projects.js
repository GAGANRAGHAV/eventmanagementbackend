import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "Ngo" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  moneyrequired: { type: Number, required: true },
  moneallocated: { type: Number },
  image: { type: String, required: true },
  location: {type:String,required:true},
  eventDate: { type: Date}, // Include event date in schema
  // participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Com" }], // References Participant IDs
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
