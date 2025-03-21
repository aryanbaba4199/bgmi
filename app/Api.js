import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.31.105:5000"; // Replace with your backend URL

export const userApi = {
  logIn: `${API_URL}/users/login`,
  signUp: `${API_URL}/users/signUp`,
  mymatch : `${API_URL}/users/myMatch`,
  myProfile : `${API_URL}/users/myprofile`,
  updateProfile : `${API_URL}/users/updateProfile`
};

export const activityApi = {
  createMatch: `${API_URL}/matches/match/create`,
  getMatch: `${API_URL}/matches/match/get`,
  updateMatch: `${API_URL}/matches/match/update`,
  deleteMatch: `${API_URL}/matches/match/remove`,
  matchesTypes : `${API_URL}/matches/match/matchesType`,
  bookings : `${API_URL}/matches/match/booking`,
  createBooking : `${API_URL}/matches/match/booking`,
  updateBooking : `${API_URL}/matches/match/booking`,
};



// Get authentication headers
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// POST request
export const posterFunction = async (uri, formData) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(formData),
    });
    console.log('form have', formData)

    if (!response.ok) {
        console.log(response)
      throw new Error(` ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error in posting', e);
    throw new Error(e.message || 'Something went wrong');
  }
};

// GET request
export const getterFunction = async (uri) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error in fetching', e);
    throw new Error(e.message || 'Something went wrong');
  }
};

// PUT request
export const updaterFunction = async (uri, formData) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error in updating', e);
    throw new Error(e.message || 'Something went wrong');
  }
};

// DELETE request
export const removerFunction = async (uri) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error in deleting', e);
    throw new Error(e.message || 'Something went wrong');
  }
};