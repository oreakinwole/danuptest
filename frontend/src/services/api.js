import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

export default {
  async login() {
    try {
      const res = await instance.post("/api/v1/auth/login", {
        email: email,
        password: password,
      });

      return { data: res.data };
    } catch (error) {
      return { err };
    }
  },

  async register() {
    try {
      const res = await instance.post("/api/v1/auth/register", {
        email: email,
        password: password,
      });

      return { data: res.data };
    } catch (error) {
      return { err };
    }
  },
};
