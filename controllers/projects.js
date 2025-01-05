import Project from "../models/Projects.js";
import Ngo from "../models/ngo.js";

export const createproject = async (req, res) => {
  const { name, description, ngo, moneyrequired, image ,location,eventDate} = req.body;

  // Validation (optional, but recommended)
  if (!name || !description || !ngo || !moneyrequired) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingNgo = await Ngo.findById(ngo);
    if (!existingNgo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    const project = new Project({
      name,
      description,
      ngo,
      moneyrequired,
      image,
      location,
      eventDate, // Include event date in payload

    });

    await project.save();
    res.status(201).json({ project, message: "Project created successfully" });
  } catch (error) {
    console.error("Error creating project:", error); // Log the error for debugging
    res
      .status(400)
      .json({ message: `Error creating project: ${error.message}` });
  }
};

export const getproject = async (req, res) => {
  try {
    const project = await Project.find();
    res
      .status(200)
      .json({ project });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    // Log the error for debugging
  }
};

export const getprojectbyid = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id).populate('participants');
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json({ project});
    } catch (error) {
      console.error("Error retrieving project:", error);
      res.status(500).json({ message: "Server error while retrieving project" });
    }
};


export const addParticipant = async (req, res) => {
  const { id: projectId } = req.params; // Match the parameter name in the route
  const { userId } = req.body;

  // console.log("Project ID:", projectId);
  // console.log("User ID:", userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Check if the user is already a participant
    if (project.participants.includes(userId)) {
      return res.status(400).json({ message: "User is already a participant." });
    }

    project.participants.push(userId);
    await project.save();

    res.status(200).json({ project, message: "Participant added successfully." });
  } catch (error) {
    console.error("Error adding participant:", error);
    res.status(500).json({ message: "Server error while adding participant." });
  }
};



export const getParticipants = async (req, res) => {
  const { id: organiserId } = req.params;

  try {
    // Find all projects organized by the given organiser
    const projects = await Project.find({ ngo: organiserId }).populate('participants');

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found for this organizer." });
    }
    // console.log(projects);
    // // Create a 2D array of participants
    // const participantsArray = projects.map((project) => ({
    //   projectName: project.name,
    //   participants: project.participants,
    // }));
    // console.log(participantsArray);
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error retrieving participants for organizer:", error);
    res.status(500).json({ message: "Server error while retrieving participants." });
  }
  // try{
  //   const projects = await Project.find({ngo: organiserId});
  //   console.log(organiserId)
  //   res.status(200).json({ projects });    
  // } catch(error){
  //   console.error("Error retrieving participants for organizer:", error);
  //     res.status(500).json({ message: "Server error while retrieving participants." });

  // }
};

export const updateproject = async (req, res) => {
  const {id} = req.params;
  const { name, description, moneyrequired,eventDate } = req.body;

  try{

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, moneyrequired,eventDate },
      { new: true }

    );

    if(!updatedProject){
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ updatedProject, message: "Project updated successfully" });
  } catch(error){
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error while updating project" });
  }
  };

  
