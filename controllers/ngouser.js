import Ngo from "../models/ngo.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = 'your_jwt_secret_key';

export const registerngo = async (req, res) => {
  const { name, email, password, clubName, logo } = req.body;

  const existingUser = await Ngo.findOne({ name });

  if (existingUser) {
    return res.status(400).json({ msg: "Ngo name already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newNgo = new Ngo({
    name,
    email,
    password: hashedPassword,
    clubName,
    logo, // Optional: Pass the image URL if available
  });
  await newNgo.save();
  const token = jwt.sign({ userId: newNgo._id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ token,newNgo });
};

export const loginngo =  async (req, res) => {
  const { email, password } = req.body;
  const user = await Ngo.findOne({ email });
  if (!user) {
    return res.status(400).send("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid Credentials");
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ token,user});
};


export const getClubDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the NGO by ID
    const ngo = await Ngo.findById(id);

    if (!ngo) {
      return res.status(404).json({ msg: "NGO not found" });
    }

    // Send the club details
    res.status(200).json({
      name: ngo.clubName,
      logo: ngo.logo, // Assuming the logo field contains the URL or image path
    });
  } catch (error) {
    console.error("Error fetching club details:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
