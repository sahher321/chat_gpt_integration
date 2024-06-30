const {vendorService} = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createVendor = catchAsync(async (req, res) => {
  const vendor = await vendorService.createVendor(req.body);
  res.status(httpStatus.CREATED).send(vendor);
});

const getVendors = catchAsync(async (req, res) => {
  const vendor = await vendorService.getVendors();
  res.status(200).send(vendor);
});

const getVendor = catchAsync(async(req,res)=>{
  const vendor = await vendorService.getVendorById(req.params.id);
  res.status(200).send(vendor);

});
const deleteVendor=catchAsync(async(req,res)=>{
  const vendor = await vendorService.deleteVendorById(req.params.id);
  res.status(200).send(vendor);
});


const updateVendor =catchAsync(async (req,res)=>{
  const vendor =await vendorService.updateVendorById(req.params.id,req.body);
  res.status(200).send(vendor);
});
module.exports = {
  createVendor,
  getVendors,
  getVendor,
  deleteVendor,
  updateVendor
};
