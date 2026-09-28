const Blog = require('../models/Blog');
const User = require('../models/User');


// CREATE BLOG
const createBlog = async (req, res) => {
    try {

        const { title, content, tags } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const blog = await Blog.create({
            title,
            content,
            authorName: user.name,
            tags: tags
                ? (Array.isArray(tags) ? tags : tags.split(','))
                : [],
            blogImage: req.file
                ? `/uploads/${req.file.filename}`
                : '',
            author: user._id
        });

        res.status(201).json({
            message: 'Blog created successfully',
            blog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET ALL BLOGS
const getAllBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            count: blogs.length,
            blogs
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET SINGLE BLOG
const getSingleBlog = async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id)
            .populate('author', 'name email');

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        res.json(blog);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE BLOG
const updateBlog = async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        // Check ownership
        if (blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You can only update your own blog'
            });
        }

        const { title, content, tags } = req.body;

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        if (tags) {
            blog.tags = Array.isArray(tags)
                ? tags
                : tags.split(',');
        }

        if (req.file) {
            blog.blogImage = `/uploads/${req.file.filename}`;
        }

        await blog.save();

        res.json({
            message: 'Blog updated successfully',
            blog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE BLOG
const deleteBlog = async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        // Check ownership
        if (blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You can only delete your own blog'
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Blog deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};