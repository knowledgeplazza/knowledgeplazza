import errors = require('feathers-errors');

export function notFound() {
  return (req, res, next) => {
    next(new errors.NotFound('Page not found'));
  };
};
