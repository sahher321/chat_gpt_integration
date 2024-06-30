const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const getAnswer = {
  body: Joi.object().keys({
    question: Joi.string().required(),
  }),
};
module.exports = {
  getAnswer,
};
