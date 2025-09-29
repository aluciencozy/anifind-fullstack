const errorMiddleware = (err, req, res, next) => {
  try {
    console.error(err);

    let message = err.message || 'Internal Server Error';
    let statusCode = err.statusCode || 500;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      message = 'Resource not found';
      statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      message = 'Duplicate field value entered';
      statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      message = Object.values(err.errors).map(val => val.message).join(', ');
      statusCode = 400;
    }

    res.status(statusCode).json({ success: false, error: message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;