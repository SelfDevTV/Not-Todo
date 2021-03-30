import { Document, Model, model, Types, Schema, Query } from "mongoose";

// const TodoSchema = new mongoose.Schema({
//     title: String,
//     id: mongoose.SchemaTypes.ObjectId,
//     ownerId: mongoose.SchemaTypes.ObjectId,
// });

interface ToDo {
    title: string;
    done: boolean;
}

interface ToDoBaseDocument extends ToDo, Document {}

// export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
