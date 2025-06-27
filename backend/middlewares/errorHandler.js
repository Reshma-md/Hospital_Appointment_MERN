export default (err, req, res, next) => {
  console.error(err); // Ensure this is present
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};