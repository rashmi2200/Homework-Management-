// Route for handling assignment submissions by students
app.post("/Submit Assignment", async (req, res) => {
  try {
    // Retrieve assignment data from request body
    const { assignmentTitle, dueDate, file } = req.body;

    // Create new assignment document
    const newAssignment = new Assignment({
      title: assignmentTitle,
      dueDate: dueDate,
      file: file,
    });

    // Save the assignment to the database
    await newAssignment.save();

    // Send success response
    res.status(201).json({ message: "Assignment submitted successfully" });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
