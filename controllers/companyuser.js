import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

const JWT_SECRET = "your_jwt_secret_key";

export const registercompany = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await Company.findOne({ name });

  if (existingUser) {
    return res.status(400).json({ msg: "Company name already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newCompany = new Company({
    name,
    email,
    password: hashedPassword,
  });
  await newCompany.save();
  const token = jwt.sign({ userId: newCompany._id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({ token, newCompany });
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body; // Expect `email` in the request body
  try {
    const user = await Company.findOne({ email }); // Query by email
    console.log("User:", user);

    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error during login");
  }
};
