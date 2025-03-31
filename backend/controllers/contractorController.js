import { Contractor } from "../models/contractor.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
export const getAllContractors = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 5,
      searchQuery = "",
      location = "",
      rating = 0,
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    rating = parseInt(rating);
    const skip = (page - 1) * limit;

    // Build the match query for filtering
    const matchQuery = {
      role: "Contractor",
      "contractorDetails.company": { $exists: true, $ne: "" },
      "contractorDetails.designation": { $exists: true, $ne: "" },
      "contractorDetails.city": { $exists: true, $ne: "" },
    };

    // Add search query filter (name)
    if (searchQuery) {
      matchQuery.name = { $regex: searchQuery, $options: "i" };
    }

    // Add location filter
    if (location) {
      matchQuery["contractorDetails.city"] = location;
    }

    // Add rating filter
    if (rating > 0) {
      matchQuery["contractorDetails.rating"] = { $gte: rating };
    }

    // Fetch filtered contractors
    const contractors = await User.aggregate([
      { $match: { role: "Contractor" } },
      {
        $lookup: {
          from: "contractors",
          localField: "_id",
          foreignField: "userId",
          as: "contractorDetails",
        },
      },
      { $unwind: "$contractorDetails" },
      { $match: matchQuery },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: "$contractorDetails.phone",
          role: 1,
          avatar: 1,
          company: "$contractorDetails.company",
          rating: "$contractorDetails.rating",
          description: "$contractorDetails.description",
          location: "$contractorDetails.city",
          specializations: "$contractorDetails.specializations",
          website: "$contractorDetails.website",
          experience: "$contractorDetails.experience",
          designation: "$contractorDetails.designation",
          age: "$contractorDetails.age",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    // Count total filtered contractors
    const totalFilteredContractors = await User.aggregate([
      { $match: { role: "Contractor" } },
      {
        $lookup: {
          from: "contractors",
          localField: "_id",
          foreignField: "userId",
          as: "contractorDetails",
        },
      },
      { $unwind: "$contractorDetails" },
      { $match: matchQuery },
      { $count: "total" },
    ]);

    const total =
      totalFilteredContractors.length > 0
        ? totalFilteredContractors[0].total
        : 0;

    res.status(200).json({
      success: true,
      message: "All contractors with complete data",
      contractors,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Error fetching contractors:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const updateContractorProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const {
      company,
      experience,
      designation,
      age,
      city,
      description,
      phone,
      website,
      specializations,
    } = req.body;

    let parsedSpecializations = [];
    if (Array.isArray(specializations)) {
      parsedSpecializations = specializations;
    } else if (typeof specializations === "string") {
      try {
        parsedSpecializations = JSON.parse(specializations);
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Invalid specializations format" });
      }
    }

    let contractor = await Contractor.findOne({ userId });

    if (!contractor) {
      contractor = new Contractor({
        userId,
        company,
        experience,
        designation,
        age,
        city,
        description,
        phone,
        website,
        specializations: parsedSpecializations,
      });
    } else {
      contractor.company = company ?? contractor.company;
      contractor.experience = experience ?? contractor.experience;
      contractor.designation = designation ?? contractor.designation;
      contractor.age = age ?? contractor.age;
      contractor.city = city ?? contractor.city;
      contractor.description = description ?? contractor.description;
      contractor.phone = phone ?? contractor.phone;
      contractor.website = website ?? contractor.website;
      if (parsedSpecializations.length > 0) {
        contractor.specializations = parsedSpecializations;
      }
    }

    await contractor.save();

    return res.status(200).json({
      message: "Contractor profile updated successfully",
      contractor,
    });
  } catch (error) {
    console.error("Error updating contractor profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getContractor = async (req, res) => {
  try {
    const { userId } = req.user;

    const contractor = await Contractor.findOne({ userId });

    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }

    res.status(200).json({
      message: "Contractor found",
      contractor,
    });
  } catch (error) {
    console.error("Error getting contractor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getContractorById = async (req, res) => {
  try {
    const { id } = req.params; // Get contractor ID from request parameters

    const contractor = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id), role: "Contractor" }, // Match by ID and role
      },
      {
        $lookup: {
          from: "contractors",
          localField: "_id",
          foreignField: "userId",
          as: "contractorDetails",
        },
      },
      {
        $unwind: {
          path: "$contractorDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,

          role: 1,
          avatar: 1,
          company: "$contractorDetails.company",
          rating: "$contractorDetails.rating",
          description: "$contractorDetails.description",
          location: "$contractorDetails.city",
          specializations: "$contractorDetails.specializations",
          website: "$contractorDetails.website",
          experience: "$contractorDetails.experience",
          designation: "$contractorDetails.designation",
          age: "$contractorDetails.age",
          phone: "$contractorDetails.phone",
        },
      },
    ]);

    if (!contractor.length) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contractor details",
      contractor: contractor[0], // Return single object
    });
  } catch (error) {
    console.error("Error fetching contractor:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
