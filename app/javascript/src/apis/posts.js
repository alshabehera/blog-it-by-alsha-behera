import axios from "axios";

const fetch = (params = {}) => axios.get("/posts", { params });
const create = (payload) => axios.post("/posts",{post:payload})
const show = (slug) => axios.get(`/posts/${slug}`)
const update = (slug,payload) => axios.patch(`/posts/${slug}`, {post:payload})
const destroy = (slug) => axios.delete(`/posts/${slug}`)
const vote = (slug, voteType) => axios.post(`/posts/${slug}/vote`, { vote_type: voteType });
const generatePdf = (slug) => axios.post(`/posts/${slug}/report`, {});

const download = (slug) => axios.get(`/posts/${slug}/report/download`, { responseType: "blob" });
const postsApi = { fetch, create, show, update,destroy, vote, generatePdf,download };


export default postsApi;