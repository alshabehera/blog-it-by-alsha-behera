import axios from "axios";

const fetch = () => axios.get("/posts");
const submit = (payload) => axios.post("/posts",payload)
const show = (slug) => axios.get(`/posts/${slug}`)

const postsApi = { fetch,submit,show };

export default postsApi;