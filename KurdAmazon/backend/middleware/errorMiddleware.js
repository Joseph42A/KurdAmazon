// for not found routes
const notFound = (req, res, next) => {
  const error = new Error("Not Found - ", req.originalUrl);
  re.status(404);
  next(error);
};

// for handle unhadled error
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  next();
};

export { notFound, errorHandler };
