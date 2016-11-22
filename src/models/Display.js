const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const _ = require('underscore');

let DisplayModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const DisplaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  
  message:{
    type: String,
    required:false,
  },

  score: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },

  color: {
    type: String,
    required: true,
    trim: true,
    default: 'Gray',
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

DisplaySchema.statics.toAPI = doc => ({
  name: doc.name,
  message: doc.message,
  color: doc.color,
});

DisplaySchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DisplayModel.find(search).select('name message score color').exec(callback);
};

DisplayModel = mongoose.model('Display', DisplaySchema);

module.exports.DisplayModel = DisplayModel;
module.exports.DisplaySchema = DisplaySchema;