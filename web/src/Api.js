import axios from "axios";

const API_URL = "http://localhost:5000";

export const userApi = {
    logIn: `${API_URL}/users/login`,
    signUp : `${API_URL}/users/signUp`,
};

export const activityApi = {
    createMatch : `${API_URL}/matches/match/create`,
    getMatch : `${API_URL}/matches/match/get`,
    updateMatch : `${API_URL}/matches/match/update`,
    deleteMatch : `${API_URL}/matches/match/remove`,
    updateRoom : `${API_URL}/matches/match/updateRoom`,
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const posterFunction = async (uri, formData) => {
    try {
        const res = await axios.post(uri, formData, {
            headers: getAuthHeaders(),
        });
        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error("Error in posting", e);
        throw new Error(e.response?.data?.message || "Something went wrong");
    }
};

export const getterFunction = async (uri) => {
    try {
        const res = await axios.get(uri, {
            headers: getAuthHeaders(),
        });
        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error("Error in fetching", e);
        throw new Error(e.response?.data?.message || "Something went wrong");
    }
};

export const updaterFunction = async (uri, formData) => {
    try {
        const res = await axios.put(uri, formData, {
            headers: getAuthHeaders(),
        });
        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error("Error in updating", e);
        throw new Error(e.response?.data?.message || "Something went wrong");
    }
};

export const removerFunction = async (uri) => {
    try {
        const res = await axios.delete(uri, {
            headers: getAuthHeaders(),
        });
        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error("Error in deleting", e);
        throw new Error(e.response?.data?.message || "Something went wrong");
    }
};
