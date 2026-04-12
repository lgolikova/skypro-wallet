import { useState, useEffect, useContext } from "react";
import { SpendsContext } from "./SpendsContext";
// import { transactions } from "../data";
import { useNavigate } from "react-router-dom";
import { fetchSpends, postSpend } from "../services/spends";
import { AuthContext } from "./AuthContext";


export const SpendsProvider = ({ children }) => {
  // const [spends, setSpends] = useState(() => {
  //   const savedSpends = localStorage.getItem("spends");

  //   if (savedSpends) {
  //     return JSON.parse(savedSpends);
  //   }

  //   return transactions;
  // });

  const { token } = useContext(AuthContext);
  // console.log("token в провайдере расходов: ", token);


  const [spends, setSpends] = useState([]);
  const [isSpendSelected, setIsSpendSelected] = useState("");
  const [newSpendDescription, setNewSpendDescription] = useState("");
  const [newSpendCategory, setNewSpendCategory] = useState("");
  const [newSpendDate, setNewSpendDate] = useState("");
  const [newSpendSum, setNewSpendSum] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getSpends();
    }
  }, [token]);


  const getSpends = async () => {
    if (!token) return;

    try {
      const data = await fetchSpends(token);
      // console.log("data в провайдере: ", data);
      setSpends(data);
    } catch (err) {
      console.error("Ошибка при получении курсов: ", err);
    }
  };


  const handleSendEditClick = (spendId) => {
    // console.log(`кликнули по строчке с id=${spendId}`);
    setIsSpendSelected(spendId);

    navigate(`/spend/${spendId}`);
  };


  const addSpend = async ({ description, category, date, sum, }) => {
    if (description && description.trim().length > 0) {
      try {
        const newSpend = { description, category, date, sum };
        console.log("newSpend: ", newSpend);
        console.log("категория category: ", category);

        const updatedSpendList = await postSpend(token, newSpend);
        // console.log("updatedSpendList.transactions: ", updatedSpendList.transactions);

        setSpends(updatedSpendList.transactions);

        setNewSpendDescription("");
        setNewSpendCategory("");
        setNewSpendDate("");
        setNewSpendSum("");
      } catch (err) {
        console.log("Ошибка при добавлении задачи в провайдере: ", err);
      }
    }
  };

  const deleteSpend = (spendId) => {
    setSpends(
      spends.filter((spend) => spend._id !== spendId)
    )
  };

  useEffect(() => {
    localStorage.setItem("spends", JSON.stringify(spends));
  }, [spends]);


  return (
    <SpendsContext.Provider
      value={{
        spends, getSpends,
        isSpendSelected, setIsSpendSelected,
        handleSendEditClick,
        addSpend, deleteSpend,
        newSpendDescription, setNewSpendDescription,
        newSpendCategory, setNewSpendCategory,
        newSpendDate, setNewSpendDate,
        newSpendSum, setNewSpendSum,
      }}>
      {children}
    </SpendsContext.Provider>
  )
}