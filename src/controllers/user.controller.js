const httpStatus = require("http-status");
const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.params.id);
  res.status(200).send(user);
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).send(user);
  //res.status(200).json("chal puttar tu chutti kar");
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["email"]);
  const options = pick(req.query, ["sortby", "limit", "page"]);
  const user = await userService.queryUsers(filter, options);
  res.status(200).send(user);
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.status(200).send(user);
});

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUserById,
};
