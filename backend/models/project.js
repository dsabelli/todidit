const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isEditing: {
    type: Boolean,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  archivedOn: {
    type: Date,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  didits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Didit",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdOn: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Project", schema);
