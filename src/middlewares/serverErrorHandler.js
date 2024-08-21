function serverErrorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    data: err.data || ''
  });
}

export default serverErrorHandler;