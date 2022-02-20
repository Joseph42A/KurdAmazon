import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc  Fetch all proudcts
// @route GET /api/products
// @access Publi
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const skipValue = pageSize * (page - 1);

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(skipValue);

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.description = description ? description : product.description;
    product.image = image ? image : product.description;
    product.brand = brand ? brand : product.brand;
    product.category = category ? category : product.category;
    product.countInStock = countInStock ? countInStock : product.countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createNewReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  console.log("ratignggggggggg ", rating);

  const product = await Product.findById(req.params.id);

  console.log("ratignggggggggg ", product);

  if (product) {
    const alreadyReviewd = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    console.log("ratignggggggggg ", alreadyReviewd);

    if (alreadyReviewd) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  // sort by rating
  const products = await Product.find({})
    .sort({
      rating: -1,
    })
    .limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
  createNewReview,
  getTopProducts,
};
