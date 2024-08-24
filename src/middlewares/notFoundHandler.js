import createHttpError from 'http-errors';

function notFoundHandler(req, res, next) {
  next(createHttpError(404, 'Route non found'));
};

export default notFoundHandler;