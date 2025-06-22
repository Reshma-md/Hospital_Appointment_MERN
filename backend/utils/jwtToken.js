export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Set token in cookies for Admin
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + ((process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000)),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
