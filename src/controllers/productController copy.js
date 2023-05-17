
exports.getAllProducts = async (_, res) => {
    console.log("Product -> getAllProducts");
    const products = await Product.find();
    res.json(products);
};