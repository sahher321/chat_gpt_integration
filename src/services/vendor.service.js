const httpStatus = require("http-status");
const { Vendor } = require("../models");
const mongoose = require("mongoose");
const ApiError = require("../utils/APIError");

/**
 * Create a Vendor
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createVendor = async (userBody) => {
  const user = await Vendor.create(userBody);
  return user;
};

/**
 * Query for Vendors
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const getVendors = () => {
  const vendor = Vendor.find().populate("product");
  return vendor;
};

const getVendorById = async (id) => {
  const vendor = Vendor.findById(id);
  return vendor;
};

const deleteVendorById = (id) => {
  const vendor = Vendor.delete(id);
  return vendor;
};

const updateVendorById = (id, body) => {
  console.log(body);
  const vendor = Vendor.findByIdAndUpdate(id, body);
  return vendor;
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  deleteVendorById,
  updateVendorById
};
