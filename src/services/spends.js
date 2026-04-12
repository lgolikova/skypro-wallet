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
    return resp.data;
  } catch (error) {
    console.error("Ошибка при получении расходов: ", error);
  }
};

export async function postSpend(token, newSpend) {
  try {
    const resp = await axios.post(API_URL, newSpend, {
      headers: {
        "Content-type": "",
        Authorization: `Bearer ${token}`,
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Ошибка при добавлении расхода: ", error);
    throw error;
  }
};

export async function deleteSpend(token, spendId) {
  try {
    const resp = await axios.delete(`${API_URL}/${spendId}`, {
      headers: {
        "Content-type": "",
        Authorization: `Bearer ${token}`,
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Ошибка при добавлении расхода: ", error);
    throw error;
  }
};

export async function patchSpend(token, spendId, newData) {
  try {
    const resp = await axios.patch(`${API_URL}/${spendId}`, newData, {
      headers: {
        "Content-type": "",
        Authorization: `Bearer ${token}`,
      }
    });
    return resp.data;
  } catch (error) {
    console.error("Ошибка при редактировании расхода: ", error);
    throw error;
  }
};
