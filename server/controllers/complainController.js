const Complaint = require('../models/Complaint');

// 📌 Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { name, phone, location, issue, additionalInfo } = req.body;

    // Handle multiple uploaded files from multer
    const files = req.files || [];

    // Convert file info to array of URLs
    const imageUrls = files.map(file => ({
      url: `/uploads/${file.filename}`
    }));

    console.log("Received Files:", files);
    console.log("Complaint Data:", {
      name,
      phone,
      location,
      issue,
      additionalInfo,
      imageUrls
    });

    // Create new complaint document
    const complaint = new Complaint({
      name,
      phone,
      location,
      issue,
      additionalInfo,
      images: imageUrls.length > 0 ? imageUrls : [],
      createdBy: req.user?._id || null,
    });

    // Save to DB
    await complaint.save();

    res.status(201).json({
      message: "Complaint registered successfully",
      complaint
    });

  } catch (error) {
    console.error("Create Complaint Error:", error);
    res.status(500).json({ message: "Server error while creating complaint" });
  }
};


// 📌 Get all complaints (with optional status filter + pagination)
const getComplaints = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const filter = status ? { status } : {};

  try {
    const complaints = await Complaint.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    const total = await Complaint.countDocuments(filter);

    res.json({ total, complaints });
  } catch (error) {
    console.error("Get Complaints Error:", error);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

// 📌 Get a single complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    res.json(complaint);
  } catch (error) {
    console.error("Get Complaint By ID Error:", error);
    res.status(500).json({ message: "Error retrieving complaint" });
  }
};

const getComplaintByUser = async (req,res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user._id })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if(!complaints) return res.status(404).json({ message: "Complaint not found" });
    res.json(complaints);
  } catch (error) {
    console.error("Get Complaint By User Error:", error);
    return { success: false, error: "Error retrieving complaints" };
  }
}
// 📌 Update complaint status / remarks / assignedTo
const updateComplaintStatus = async (req, res) => {
  const { status, remarks, assignedTo } = req.body;

  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(remarks && { remarks }),
        ...(assignedTo && { assignedTo }),
        updatedAt: Date.now(),
      },
      { new: true }
    ).populate("assignedTo", "name email");

    if (!updated) return res.status(404).json({ message: "Complaint not found" });

    res.json({ message: "Complaint updated", complaint: updated });
  } catch (error) {
    console.error("Update Complaint Error:", error);
    res.status(500).json({ message: "Error updating complaint" });
  }
};

// 📌 Delete a complaint
const deleteComplaint = async (req, res) => {
  try {
    const user=req.user
    console.log(user);
    
    if(user.role=="admin") {
        const deleted = await Complaint.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Complaint not found" });
        res.json({ message: "Complaint deleted" });
    }else{
        res.json({ message: "Not permited to delete Complaints" });

    }


  } catch (error) {
    console.error("Delete Complaint Error:", error);
    res.status(500).json({ message: "Error deleting complaint" });
  }
};


module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  getComplaintByUser
}