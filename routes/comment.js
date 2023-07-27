const express = require('express')

const router = express.Router()

const commentController = require('../controllers/commentController')

router.get('/comments/:id_video', commentController.readComments)

router.post('/comments/:id_video', commentController.addComment)

module.exports = router