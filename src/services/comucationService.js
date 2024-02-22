import axios from "axios";
export const getAllCatsServices = async () => {
    try {
        const { data } = await axios.get(`https://meowfacts.herokuapp.com/?count=2`);
        console.log('data ::::::::::', data);
        return data;
    } catch (e) {
        throw new Error(e.response?.data?.message || e.message);
    }
};