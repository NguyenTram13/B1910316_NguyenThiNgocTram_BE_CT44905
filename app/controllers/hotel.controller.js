const {
  getPaganitionService,
  createHotelService,
  deleteHotelService,
  getOneService,
  updateHotelService,
  getHotelSameService,
  create_rating_service,
} = require("../services/hotel.service");

const getPaganition = (req, res) => {
  try {
    return getPaganitionService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const createHotel = (req, res) => {
  try {
    return createHotelService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteHotel = (req, res) => {
  try {
    return deleteHotelService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getOne = (req, res) => {
  try {
    return getOneService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const updateHotel = (req, res) => {
  try {
    return updateHotelService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getHotelSame = (req, res) => {
  try {
    return getHotelSameService(req, res);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const create_rating = (req, res) => {
  try {
    return create_rating_service(req, res);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports = {
  getPaganition,
  createHotel,
  deleteHotel,
  getOne,
  updateHotel,
  getHotelSame,
  create_rating,
};
