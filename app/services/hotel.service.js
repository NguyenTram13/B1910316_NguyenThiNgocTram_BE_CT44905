let per_page = 3;
const bcrypt = require("bcrypt");
const { request } = require("../../app");
const HotelModel = require("../models/HotelModel");

const getPaganitionService = async (req, res) => {
  try {
    // return res.status(200).json("get success");
    let new_per_page = req.query.per_page;
    let offset = (req.query.page - 1) * new_per_page;
    console.log(req.query.keyword);
    let keyword = req.query.keyword;
    let hotels;
    if (!req.query.id_province) {
      hotels = await HotelModel.find({})
        .skip(offset)
        .limit(new_per_page)
        .sort({ createdAt: "desc" });
    } else {
      hotels = await HotelModel.find({
        id_province: req.query.id_province,
      })
        .skip(offset)
        .limit(new_per_page)
        .sort({ createdAt: "desc" });
    }
    let totalPage = await HotelModel.count();

    return res.status(200).json({
      hotels: hotels,
      totalPage: Math.ceil(totalPage / new_per_page),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
const createHotelService = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    let arr = [];
    if (req.files.length > 0) {
      req.files.forEach((image) => arr.push(image));
    }
    const newHotel = new HotelModel({
      name: req.body.name,
      address: req.body.address,
      price: req.body.price,
      id_province: req.body.id_province,
      images: arr,
    });
    await newHotel.save();
    return res.status(201).json("success");
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const deleteHotelService = async (req, res) => {
  try {
    const hotel = await HotelModel.findOne({ _id: req.params.id });
    if (!hotel) return res.status(200).json("delete success");
    await hotel.remove();
    return res.status(200).json("delete success");
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

const getOneService = async (req, res) => {
  try {
    const hotel = await HotelModel.findOne({ _id: req.params.id });
    if (!hotel) return res.status(404).json("HOTEL NOT FOUND");
    return res.status(200).json(hotel);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const updateHotelService = async (req, res) => {
  try {
    console.log(req.body);
    const hotel = await HotelModel.findOne({ _id: req.params.id });
    if (!hotel) return res.status(500).json("Khách sạn không tồn tại!");
    if (req.files && req.files.length > 0) {
      req.body.images = req.files;
    } else {
      delete req.body.images;
    }

    const status = await HotelModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(201).json(status);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getHotelSameService = async (req, res) => {
  try {
    const hotels = await HotelModel.find({
      id_province: req.params.id,
      _id: { $ne: req.params.id_doc },
    });
    return res.status(200).json(hotels);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const create_rating_service = async (req, res) => {
  try {
    const hotel = await HotelModel.findOne({ _id: req.params.id });
    if (!hotel) return res.status(500).json("Khách sạn không tồn tại!");
    if (!hotel.rating) {
      hotel.rating = [
        {
          rating: req.body.rating,
          text: req.body.text,
          name: req.body.name,
        },
      ];
    } else {
      hotel.rating = [
        {
          rating: req.body.rating,
          text: req.body.text,
          name: req.body.name,
        },
        ...hotel.rating,
      ];
    }

    await hotel.save();
    return res.status(200).json(hotel);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
module.exports = {
  getPaganitionService,
  createHotelService,
  deleteHotelService,
  getOneService,
  updateHotelService,
  getHotelSameService,
  create_rating_service,
};
