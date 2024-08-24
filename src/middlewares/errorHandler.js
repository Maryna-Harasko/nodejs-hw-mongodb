function errorHandler(err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err
    });
    return;
  }
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    data: err.message
  });
}

export default errorHandler;
