import axios from "axios";


const API_URL = "https://wedev-api.sky.pro/api/transactions";


export async function fetchSpends(token) {
  try {
    const resp = await axios.get(API_URL, {
      headers: {
        "Content-type": "",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Ответ сервера в fetchSpends: ", resp.data);
    return resp.data;
  } catch (error) {
    console.error("Ошибка при получении расходов: ", error);
    // throw new Error(error.response.data.error);
  }
};

