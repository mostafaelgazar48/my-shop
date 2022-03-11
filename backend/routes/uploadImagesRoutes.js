const path = require('path')
const express = require('express')
const multer = require('multer')

const router = express.Router();

const storageEngine = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function typeValidation(file, cb) {
    const fileTypes = /jpg|png|jpeg/
    const ext = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (ext && mimeType) {
        return cb(null, true)
    } else {
        cb(' this type of file is not supported')
    }
}

const upload = multer({
    storage:storageEngine,
    fileFilter: function (req, file, cb) {
        typeValidation(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})
module.exports =router;