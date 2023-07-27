
# GG3 - Midterm

Simple Tokopedia Play Clone server API. 


## Getting Started

Install libraries with yarn

```bash
  yarn install
```
    
Create dotenv and edit env variable

```bash
  cp .env.example .env
```

Run DB Seeder (Optional)

```bash
  node seeder.js
```

Run the development server

```bash
  yarn dev
```

## Database Documentation

### Video
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    products: [
      {
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
    comments: [
      {
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  }

Video schema contains products and comments fields which is array of id that refers to another collection.
Aside from that, Video contains required title, description, url, and thumbnailUrl fields.

### Product
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }

Product schema contains required title, description, url, and price fields.

### Comment

  {
    username: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
  }

Comment schema contains username, post, and createdAt (MongoDB Timestamp) fields.

## API Documentation

### Home (Get Video list)
Request :
`GET /api/home`

Response :
  {
      "data": [
          {
              "_id": "64c7a0d83866a8cbf1336877",
              "title": "Video1",
              "description": "description",
              "url": "youtube.com",
              "thumbnailUrl": "google.com",
              "__v": 0
          },
          {
              "_id": "64c7a0e73866a8cbf133687b",
              "title": "Video2",
              "description": "description2",
              "url": "youtube2.com",
              "thumbnailUrl": "google2.com",
              "__v": 0
          }
      ],
      "meta": {
          "curr_page": 1,
          "prev_page": null,
          "next_page": null,
          "first_page": "http://localhost:3000/api/home?page=1&limit=10",
          "last_page": "http://localhost:3000/api/home?page=1&limit=10"
      }
  }

### Add Video
Request:
`POST /api/video/:_id`
Body:
  {
    "title": "Video1",
    "description": "description updated",
    "url": "youtube.com",
    "thumbnailUrl": "google.com"
  }

Response:
  {
    "message": "Video berhasil dibuat"
  }



### Delete Video
Request:
  `DELETE /api/video/:_id`

Response:
  {
    "message": "Delete Video berhasil"
  }

### Update Video
Request:
  `PUT /api/video/:_id`

Body:
  {
    "title": "Video1",
    "description": "description updated",
    "url": "youtube.com",
    "thumbnailUrl": "google.com"
  }

Response:
  {
    "message": "Video berhasil diupdate"
  }


### Read Comments in Video
Request:
  `GET /api/comments/:id_video`

Response:
  {
    "message": "Comments berhasil dimuat",
    "data": [
        {
            "_id": "64c7b2503866a8cbf1336889",
            "username": "user1",
            "post": "ini video baguztt bgttt!!!!",
            "createdAt": "31 July 2023",
            "__v": 0
        }
    ]
  }

### Add Comment in Video
Request:
  `POST /api/comments/:id_video`

Body:
  {
    "username": "user1",
    "post": "ini video baguztt bgttt!!!!"
  }

Response:
  {
    "message": "Comment berhasil dibuat",
    "data": {
        "username": "user1",
        "post": "ini video baguztt bgttt!!!!",
        "createdAt": "2023-07-31T11:53:32.165Z",
        "_id": "64c7b2503866a8cbf1336889",
        "__v": 0
    }
  }

### Read All Products in Video
Request:
  `GET /api/products/:_id`

Response:
  {
    "message": "Product berhasil dimuat",
    "data": [
        {
            "_id": "64c7b73d3866a8cbf133689a",
            "title": "Product1",
            "description": "Description1",
            "url": "youtube.com",
            "price": 100000,
            "__v": 0
        },
        {
            "_id": "64c7b7503866a8cbf133689f",
            "title": "Product2",
            "description": "Description2",
            "url": "google.com",
            "price": 250000,
            "__v": 0
        }
    ]
  }

### Add Product in Video
Request:
  `POST /api/products/:_id`

Body:
  {
    "title": "Product2",
    "description": "Description2",
    "url": "google.com",
    "price": 300000
  }

Response:
  {
    "message": "Product berhasil dibuat"
  }

### Update Product
Request:
  `PUT /api/products/:product_id`

Body:
  {
    "title": "Product99",
    "description": "Description99",
    "url": "google99.com",
    "price": 9900000
  }

Response:
  {
    "message": "Product berhasil diupdate"
  }

### Remove Product in Video
Request:
  `DELETE /api/products/:id_video/:id_product`

Response:
  {
    "message": "Product berhasil dihapus dari Video"
  }