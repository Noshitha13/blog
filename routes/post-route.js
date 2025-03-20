const express = require("express");
const {
    showAll,
    addPost,
    updatePost,
    deletePost,
    showNewPostForm,
    showEditPostForm
} = require("../controllers/post-controller"); 

const router = express.Router();

router.get("/", showAll);
router.get("/new", showNewPostForm);
router.post("/add", addPost);

router.get("/edit/:id", showEditPostForm);
router.post("/edit/:id", updatePost);

router.get("/delete/:id", deletePost);

module.exports = router;
