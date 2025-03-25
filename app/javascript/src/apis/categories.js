import axios from "axios";

const fetch = () => axios.get("/categories");

const submit = (payload) => axios.post("/categories",payload)
const categoriesApi = { fetch,submit };

export default categoriesApi;