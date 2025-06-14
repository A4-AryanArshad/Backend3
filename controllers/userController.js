const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = new User({ firstName, lastName, email, phone, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a basic session cookie
    res.cookie('userSession', user._id.toString(), {
      httpOnly: true,
    
      sameSite: 'None',
 
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    const applicantId = req.cookies.userSession;
    console.log(applicantId);
    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  try {
    res.clearCookie('userSession', {
      httpOnly: true,
      secure: true, // true if using HTTPS
      sameSite: 'Lax'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Logout failed' });
  }
};
