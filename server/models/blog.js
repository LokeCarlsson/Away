import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema({
    author: {
        type: String,
        default: 'Sven Göran'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

export default mongoose.model("Blog", blogSchema);
