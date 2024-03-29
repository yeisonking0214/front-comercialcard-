import axios from "axios";

export const getAllCatsServices = async () => {
    try {
        const { data } = await axios.get(`https://meowfacts.herokuapp.com/?count=2&lang=esp`);
        return data;
    } catch (e) {
        throw new Error(e.response?.data?.message || e.message);
    }
};
