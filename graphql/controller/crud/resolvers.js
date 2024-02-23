// crudResolvers.js
import Donor from "../../../model/donarModel.js";

const crudResolvers = {
  Query: {
    donors: async () => {
      try {
        return await Donor.find();
      } catch (error) {
        console.error("Error fetching donors:", error);
        throw error;
      }
    },
    donor: async (_, { id }) => {
      try {
        return await Donor.findById(id);
      } catch (error) {
        console.error(`Error fetching donor with id ${id}:`, error);
        throw error;
      }
    },
  },

  Mutation: {
    createDonor: async (_, args) => {
      try {
        await Donor.create(args);
        return {
          success: true,
          message: "Donor created successfully",
        };
      } catch (error) {
        console.error("Error creating donor:", error);
        throw error;
      }
    },

    updateDonor: async (_, { id, name, email, amount }) => {
      try {
        // Update the donor with the provided name, email, and amount
        const updatedDonor = await Donor.findByIdAndUpdate(
          id,
          { name, email, amount },
          { new: true }
        );

        // Check if the donor was not found
        if (!updatedDonor) {
          return {
            success: false,
            message: "Donor not found",
          };
        }

        // Return success message along with the updated donor
        return {
          success: true,
          message: "Donor updated successfully",
          donor: updatedDonor,
        };
      } catch (error) {
        console.error(`Error updating donor with id ${id}:`, error);
        throw error;
      }
    },
    deleteDonor: async (_, { id }) => {
      try {
        await Donor.findByIdAndDelete(id);
        return {
          success: true,
          message: "Donor deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting donor with id ${id}:`, error);
        throw error;
      }
    },
  },
};

export default crudResolvers;
