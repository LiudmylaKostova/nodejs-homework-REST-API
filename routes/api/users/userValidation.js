const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).max(30).required(),
  subscription: Joi.string().valid("starter", "pro", "business").optional(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

const validateUser = async (req, _res, next) => {
  return validate(userSchema, req.body, next);
};

const validateSubscription = async (req, _res, next) => {
  return validate(subscriptionSchema, req.body, next);
};

module.exports = { validateUser, validateSubscription };
