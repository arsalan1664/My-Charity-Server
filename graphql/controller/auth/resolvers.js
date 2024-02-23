import User from "../../../model/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authResolvers = {
  Mutation: {
    register: async (_, { username, password }) => {
      //check if user already registered
      const userExists = await User.findOne({ username });
      if (userExists) {
        throw new Error("This username is already in use");
      }

      //hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 12);
      try {
        //save new user in the database
        const newUser = await new User({
          username,
          password: hashedPassword,
        }).save();
        return newUser;
      } catch (error) {
        console.log(error);
        return {
          message: "Something Went Wrong",
          success: false,
        };
      }
    },

    login: async (_, { username, password }) => {
      // check if there is user in our db
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Invalid username or password");
      }

      //Checking if password match
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid username or password");
      }

      //generating jwt token using user id
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d",
      });
      return { token, message: "Successfully Login", success: true };
    },

    editUser: async (_, { token, newUsername, newPassword }) => {
      try {
        // Verify the JWT token to extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded._id; // Assuming the user ID is stored in the token

        // Check if the logged-in user is the one trying to edit their information
        if (!userId) {
          return {
            message: "Invalid or missing user ID in the token",
            success: false,
          };
        }

        const user = await User.findById(userId);
        if (!user) {
          return {
            message: "User not found",
            success: false,
          };
        }

        // Hash the new password using bcrypt
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Update user information in the database
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { username: newUsername, password: hashedNewPassword },
          { new: true }
        );
        return {
          message: "Credentails Changed Successfully",
          success: true,
        };
      } catch (error) {
        console.log(error);
        return {
          message: error,
          success: false,
        };
      }
    },
  },
};

export default authResolvers;
