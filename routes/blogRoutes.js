const express = require('express');
const multer = require('multer');

const {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + '-' + file.originalname
        );
    }
});

const upload = multer({
    storage: storage
});


// CREATE
router.post(
    '/',
    authMiddleware,
    upload.single('blogImage'),
    createBlog
);


// READ ALL
router.get(
    '/',
    authMiddleware,
    getAllBlogs
);


// READ SINGLE
router.get(
    '/:id',
    authMiddleware,
    getSingleBlog
);


// UPDATE
router.put(
    '/:id',
    authMiddleware,
    upload.single('blogImage'),
    updateBlog
);


// DELETE
router.delete(
    '/:id',
    authMiddleware,
    deleteBlog
);


module.exports = router;