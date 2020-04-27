import Validator from 'validatorjs';

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const review = (req, res, next) => {
  const validationRule = {
    businessId: 'required|numeric',
    reviewer: 'required|numeric',
    review: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err
        });
    } else {
      next();
    }
  });
};

module.exports = {
  review
};