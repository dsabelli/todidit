const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isEditing: {
    type: Boolean,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdOn: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  completedOn: {
    type: Date,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", schema);
