module.exports.notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Opps the page you are looking for not found",
  });
  res.end();
};
