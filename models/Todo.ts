import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: String,
  id: mongoose.SchemaTypes.ObjectId,
  ownerId: mongoose.SchemaTypes.ObjectId,
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
