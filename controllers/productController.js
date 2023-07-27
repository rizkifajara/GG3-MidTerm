const { Product } = require("../models/product");
const { Video } = require("../models/video");

module.exports.addProduct = async(req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      price: req.body.price
    })
  
    await product.save()
      .then(async function(data) {
        await Video.updateOne(
          {_id: req.params._id},
          {$push: {
            products: {_id: data._id}
          }}
        )
      })

    res.status(200).json({ message: 'Product berhasil dibuat' });
    
  } catch(err) {
    console.log(err)
    res.status(500).json({
      status: res.statusCode,
      message: 'Product gagal dibuat: '+err,
    });
  }
}

module.exports.updateProduct = async(req, res) => {
  try {
    await Product.updateOne({_id: req.params.product_id}, {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    })
    res.status(200).json({ message: 'Product berhasil diupdate' });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      message: 'Product gagal diupdate: '+err,
    });
  }
}

module.exports.readAllProduct = async(req, res) => {
  try {

    const video = await Video.findOne({_id: req.params._id}, {products: 1})
    const productsId = []

    // move productId property to array
    for(let i = 0; i < video.products.length; i++) {
      productsId.push(video.products[i]._id)
    }

    // find Products where id in array
    const products = await Product.find(
      {
        '_id': {
          $in: productsId
        }
      }
    )
    res.status(200).json({message: 'Product berhasil dimuat', data: products});
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Gagal memuat Product' });
  }
}

module.exports.deleteProduct = async(req, res) => {
  try {
    await Video.updateOne({_id: req.params.id_videos}, {
      $pullAll: {
        products: [{_id: req.params.id_product}]
      }
    })
    res.status(200).json({message: 'Product berhasil dihapus dari Video'})

  } catch(err) {
    console.log(err)
    res.status(500).json({ message: 'Gagal memuat Product' });
  }
}