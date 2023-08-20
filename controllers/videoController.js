const { Comment } = require("../models/comment");
const { Video } = require("../models/video");

module.exports.addVideo = async (req, res) => {
  const video = new Video({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    thumbnailUrl: req.body.thumbnailUrl,
  });

  try {
    await video.save();
    res.status(200).json({ message: "Video berhasil dibuat" });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "Video gagal dibuat: " + err,
    });
  }
};

module.exports.readAllVideo = async (req, res) => {
  try {
    // set pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const count = await Video.countDocuments({});

    let next_page = null;
    let prev_page = null;

    const first_page = `${req.protocol}://${req.get(
      "host"
    )}/api/home?page=1&limit=${limit}`;

    let last_page = `${req.protocol}://${req.get(
      "host"
    )}/api/home?page=${Math.ceil(count / limit)}&limit=${limit}`;

    if(count === 0) {
      last_page = first_page
    }

    // edit next page if exist
    if (count > page * limit) {
      next_page = `${req.protocol}://${req.get("host")}/api/home?page=${
        page + 1
      }?&limit=${limit}`;
    }

    // edit previous page if exist
    if (page > 1) {
      prev_page = `${req.protocol}://${req.get("host")}/api/home?page=${
        page - 1
      }?&limit=${limit}`;
    }

    // fetch paginated data
    await Video.find({}, {comments: 0, products: 0})
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()
      .then(function (videos) {
        // parse all mongoId to string
        videos = videos.filter((video) => {
          video._id = video._id.toString()
          return video
        })
        return res.status(200).json({
          data: videos,
          meta: {
            curr_page: page,
            prev_page,
            next_page,
            first_page,
            last_page,
          },
        });
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Gagal memuat Home" });
  }
};

module.exports.readOneVideo =  async (req, res) => {
  try {
    const video = await Video.findOne({_id: req.params._id})
    console.log(video)

    res.status(200).json({ data: video})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Gagal memuat video" });
  }
}

module.exports.updateVideo = async (req, res) => {
  try {
    await Video.updateOne(
      { _id: req.params._id },
      {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        thumbnailUrl: req.body.thumbnailUrl,
      }
    );
    res.status(200).json({ message: "Video berhasil diupdate" });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: "Video gagal diupdate: " + err,
    });
  }
};

// only delete video and comment collections, product still exist
module.exports.deleteVideo = async (req, res) => {
  try {

    const video = await Video.findOne({_id: req.params._id})

    // delete every comments in documents where comment_id in this video
    for(let i = 0; i < video.comments.length; i++) {
      await Comment.deleteOne({_id: video.comments[i]._id})
    }

    // finally delete the video
    await Video.deleteOne({ _id: req.params._id });
    res.status(200).json({ message: "Delete Video berhasil" });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: res.statusCode,
      message: "Video gagal didelete: " + err,
    });
  }
};
