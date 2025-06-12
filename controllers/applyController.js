const Application = require('../models/Application');

exports.submitApplication = async (req, res) => {
  try {
    const {
      fullName, email, phone, location, role, category,
      hourlyRate, experience, description, skills,
      photoSquare, photoPortrait, portfolios
    } = req.body;

    const application = new Application({
      fullName, email, phone, location, role, category,
      hourlyRate, experience, description, skills,
      photoSquare, photoPortrait, portfolios
    });

    await application.save();

    res.status(201).json({
      message: 'Application submitted and saved to DB successfully.',
      id: application._id
    });
  } catch (err) {
    console.error('Application submission error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getApplicants = async (req, res) => {
    try {
      const { category } = req.query;
      const filter = category ? { category } : {};
  
      const applicants = await Application.find(filter);
      res.status(200).json(applicants);
    } catch (err) {
      console.error('Error fetching applicants:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };