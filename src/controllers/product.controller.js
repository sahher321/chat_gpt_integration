const httpStatus = require("http-status");
const { productService, openAiService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const getProducts = catchAsync(async (req, res) => {
  const { question } = req.body;
  const result = await openAiService.getAnswer(question);
  if (!result) {
    return res.status(400).send("something went wrong");
  }
  res.status(200).send(result);
});

module.exports = {
  getProducts,
};
