const { Video } = require("../models/video");
const { Comment } = require("../models/comment");

module.exports.addComment = async(req, res) => {
  try {
    const comment = new Comment({
      username: req.body.username,
      post: req.body.post,
    })
  
    await comment.save()
      .then(async function(data) {
        await Video.updateOne(
          {_id: req.params.id_video},
          {$push: {
            comments: {_id: data._id}
          }}
        )
      });

    res.status(200).json({ message: 'Comment berhasil dibuat', data: comment });
    
  } catch(err) {
    res.status(500).json({
      status: res.statusCode,
      message: 'Comment gagal dibuat: '+err,
    });
  }
}

module.exports.readComments = async(req, res) => {
  try {

    const video = await Video.findOne({_id: req.params.id_video}, {comments: 1})
    const commentsId = []

    // move commentId property to array
    for(let i = 0; i < video.comments.length; i++) {
      commentsId.push(video.comments[i]._id)
    }

    // find Comments where id in array
    const comments = await Comment.find(
      {
        '_id': {
          $in: commentsId
        }
      }
    ).lean()

    // parse timestamp to readable
    for(let i = 0; i < comments.length; i++) {
      let date = new Date(comments[i].createdAt)
      comments[i].createdAt = date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})
    }

    res.status(200).json({message: 'Comments berhasil dimuat', data: comments});
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Gagal memuat Comments' });
  }
}