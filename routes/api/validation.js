const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string()
    .regex(/[A-Z]\w+/)
    .min(3)
    .max(30)
    .required(),
  phone: Joi.string().length(12).required(),

  favorite: Joi.boolean().optional(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .regex(/[A-Z]\w+/)
    .min(3)
    .max(30)
    .optional(),
  phone: Joi.string().length(12).optional(),

  favorite: Joi.boolean().optional(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

module.exports.addValidContact = (req, _res, next) => {
  return validate(schemaAddContact, req.body, next);
};
module.exports.updateValidContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
module.exports.updateValidStatusContact = async (req, _res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next);
};
