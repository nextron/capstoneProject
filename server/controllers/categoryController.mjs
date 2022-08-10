import Category from "../modals/Category.mjs";

//fetch all the categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).send({ categories });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

//add a category here
const addCategory = async (req, res) => {
    try {
        // res.status(200).send(req.body["category"]);
        const category = await Category.create(req.body["category"]);
        res.status(200).send({ msg: "Category Added" });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}
export { getAllCategories, addCategory };