const express = require('express')

const router = express.Router()

const videoController = require('../controllers/videoController')

router.get('/home', videoController.readAllVideo)

router.post('/video', videoController.addVideo)

router.put('/video/:_id', videoController.updateVideo)

router.delete('/video/:_id', videoController.deleteVideo)

module.exports = router