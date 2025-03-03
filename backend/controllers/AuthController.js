const UserModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    console.log(req.body);


    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const users = await UserModel.create({ name, email, phone, password: hashedPassword });

    return res.status(200).send({
      success: true,
      message: "User created successfully",
      users
    });


  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, "login");

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Find user with email and fetch role along with other necessary details
    const user = await UserModel.findOne({ email }).select("email password role username"); 
    console.log(user);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate token and set cookie
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in token
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("refreshToken", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });

    console.log("Login successful");

    // Send user details in response
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role, // Ensure role is included in response
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};



const logout = async (req, res) => {
  try {
    //   res.setHeader(
    //     "Set-Cookie",
    //     "refreshToken=; HttpOnly; SameSite=None; Secure; Path=/; Max-Age=0"
    //   );
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1] // Extract token after "Bearer"
      : req.cookies.refreshToken;
    // console.log(token,"token logOut");

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true, // Use `false` for local development without HTTPS
      sameSite: "None", // Change this to 'Lax' if SameSite=None is causing issues
    });

    console.log("Logout successful");

    return res.status(200).send({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred during logout",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Fetched Succesfully.",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "An error occurred during userfetch",
      error: error.message,
    });
  }
};

const getalluser = async (req, res) => {
  try {
    const user = await UserModel.find({});

    // console.log(user);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  logout,
  getalluser,
  getUser,


};
