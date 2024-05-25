import axios from "axios";

const API_BASE_URL = "http://localhost:3002/api/uae-pass/0.0.1";

export const login = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/login`, {
      withCredentials: true,
    });
    window.location.href = response.data.data.redirectUrl;
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const handleCallback = async (code) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/0.0.1/callback`, { code }, { withCredentials: true });
        localStorage.setItem('jwtToken', response.data.jwtToken);
        return response.data;
    } catch (error) {
        console.error('Callback error:', error);
    }
};

export const verifyToken = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.post(
      `${API_BASE_URL}/verify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
};

export const logout = async () => {
  localStorage.removeItem("jwtToken");
  const response = await axios.get(`${API_BASE_URL}/logout`, {
    withCredentials: true,
  });
  window.location.href = response.data.redirectUrl;
};

// import axios from 'axios';

// const API_URL = 'http://localhost:3002/api/uae-pass/0.0.1';

// const login = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/login`);
//     window.location.href = response.data.redirectUrl;
//   } catch (error) {
//     console.error('Login failed:', error);
//   }
// };

// const callback = async (code) => {
//   try {
//     const response = await axios.get(`${API_URL}/callback`, { params: { code } });
//     if (response.data && response.data.data.jwtToken) {
//       localStorage.setItem('token', response.data.data.jwtToken);
//     }
//     return response.data;
//   } catch (error) {
//     console.error('Callback failed:', error);
//     return null;
//   }
// };

// const verify = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) throw new Error('No token found');
//     const response = await axios.get(`${API_URL}/verify`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Verification failed:', error);
//     return null;
//   }
// };

// const logout = () => {
//   localStorage.removeItem('token');
//   window.location.href = `${API_URL}/logout`;
// };

// export { login, callback, verify, logout };
