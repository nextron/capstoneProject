import Category from "../modals/Category.mjs";

//fetch all the categories
const getAllCategories = (req, res) => {
    res.status(200).send("get");
}

//add a category here
const addCategory = (req, res) => {
    res.status(200).send("add");
}
export { getAllCategories, addCategory };