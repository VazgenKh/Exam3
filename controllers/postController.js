const Post = require('../models/Post');
const Joi = require('joi');

exports.createPost = async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        userId: Joi.number().integer().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.create(req.body);
    res.send(post);
};

exports.getPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const posts = await Post.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset)
    });

    res.send({
        total: posts.count,
        pages: Math.ceil(posts.count / limit),
        data: posts.rows
    });
};

exports.getSinglePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.send(post);
};

exports.updatePost = async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(10).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    await post.update(req.body);
    res.send(post);
};

exports.searchPost = async (req, res) => {
    const { search } = req.query;

    const posts = await Post.findAll({
        where: {
            title: {
                [Op.like]: `%${search}%`
            }
        }
    });

    res.send(posts);
};
