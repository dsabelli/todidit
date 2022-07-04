const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isChecked: {
    type: Boolean,
  },
  isEditing: {
    type: Boolean,
  },
  dueDate: {
    type: Date,
  },
  project: {
    type: Number,
  },
  priority: {
    type: Number,
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
  date: {
    type: Date,
    immutable: true,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Task", schema);
