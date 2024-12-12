import express from "express"
import User from  "../models/user.models.js"

const router = express.Router()

// get all users
router.get("/", async (req, res, next) => {
    try {
    const showAll = await User.find()
     return res.status(200).json(showAll);
      
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Internal Server Error" });
        next(err);
    }
    res.send("Server is running!");
  });
// get by single user  
  // Get single user by ID
router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Find the user by ID
      const singleUser = await User.findById(id);
      
      // Check if the user exists
      if (!singleUser) {
        // If no user found, return 404
        return res.status(404).json({ message: "User not found" });
      }
  
      // If user found, return the user data
      return res.status(200).json(singleUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching user", error });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});

router.patch("/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const {name, email, age} = req.body
      const updateUser = await User.findByIdAndUpdate(id, req.body,{
        new: true,
      });
      if (!updateUser) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ message: "User update successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
  }
});



  // create model
  router.post("/", async (req, res,) => {
    const { name, email, age } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "Email already exists!" });
      }
  
      const newUser = new User({ name, email, age });
      await newUser.save();
      res.status(201).send({ message: "User added successfully!" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong." });
    }
  });
  export default router