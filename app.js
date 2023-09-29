const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Menghubungkan ke database MongoDB
mongoose.connect("mongodb://localhost:27017/aplikasi_hafalan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Mendefinisikan skema dan model untuk collection 'progress'
const progressSchema = new mongoose.Schema({
    halaman: {
        type: Number,
        required: true,
        min: 1,
        max: 604,
    },
    status: {
        type: Boolean,
        required: true,
    },
    catatan: String,
});

const Progress = mongoose.model("progress", progressSchema);

app.use(bodyParser.json());

// Endpoint untuk menambahkan data progress
app.post("/progress", async (req, res) => {
    try {
        const { halaman, status, catatan } = req.body;
        const newProgress = new Progress({ halaman, status, catatan });
        await newProgress.save();
        res.json(newProgress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
