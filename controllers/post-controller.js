const models = require("../models");

async function showAll(req, res) {
    try {
        const blogs = await models.Post.findAll({
            where: { userId: req.session.user?.id || 0 },
            include: [{ model: models.User, attributes: ["name", "email"] }]
        });

        
        const formattedBlogs = blogs.map(blog => ({
            ...blog.toJSON(),
            createdAt: new Date(blog.createdAt).toLocaleString("en-IN", { 
                timeZone: "Asia/Kolkata",
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })
        }));

        res.render("dashboard", { user: req.session.user, blogs: formattedBlogs });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Error retrieving posts");
    }
}




function showNewPostForm(req, res) {
    res.render("new-post", { user: req.session.user });
}


function addPost(req, res) {
    models.Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.id
    })
    .then(() => res.redirect("/posts"))
    .catch((error) => {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    });
}
async function showEditPostForm(req, res) {
    try {
        const post = await models.Post.findOne({
            where: { id: req.params.id, userId: req.session.user.id }
        });

        if (!post) {
            return res.status(404).send("Post not found");
        }

        res.render("edit-post", { user: req.session.user, post });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send("Error retrieving post");
    }
}



async function updatePost(req, res) {
    try {
        await models.Post.update(
            { title: req.body.title, content: req.body.content },
            { where: { id: req.params.id, userId: req.session.user.id } } // Ensure user owns the post
        );
        res.redirect("/posts");
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("Error updating post");
    }
}


async function deletePost(req, res) {
    try {
        await models.Post.destroy({ where: { id: req.params.id, userId: req.session.user.id } });
        res.redirect("/posts");
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Error deleting post");
    }
}


module.exports = { 
    showAll, 
    showNewPostForm, 
    addPost, 
    showEditPostForm, 
    updatePost, 
    deletePost 
};
