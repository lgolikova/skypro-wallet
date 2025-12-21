import { useState, useEffect } from "react";
import { SpendsContext } from "./SpendsContext";
import { transactions } from "../data";
import { useNavigate } from "react-router-dom";


export const SpendsProvider = ({ children }) => {
  const [spends, setSpends] = useState(() => {
    const savedSpends = localStorage.getItem("spends");

    if (savedSpends) {
      return JSON.parse(savedSpends);
    }

    return transactions;
  });

  const [isSpendSelected, setIsSpendSelected] = useState("");
  const [newSpendDescription, setNewSpendDescription] = useState("");
  const [newSpendCategory, setNewSpendCategory] = useState("");
  const [newSpendDate, setNewSpendDate] = useState("");
  const [newSpendSum, setNewSpendSum] = useState("");
  const [isCategorySelected, setIsCategorySelected] = useState("");

  const navigate = useNavigate();

  const handleSendEditClick = (spendId) => {
    // console.log(`кликнули по строчке с id=${spendId}`);
    setIsSpendSelected(spendId);

    navigate(`/spend/${spendId}`);
  };

  const handleCategoryClick = (categoryName) => {
    console.log(`кликнули по категории ${categoryName}`);
    setIsCategorySelected(categoryName);

    // установить активную иконку

    // цвет текста - зелёный
  };

  const addSpend = ({
    description,
    category,
    date,
    sum,
  }) => {
    if (newSpendDescription.trim().length > 0) {
      const newSpend = {
        _id: crypto?.randomUUID() ?? Date.now().toString(),
        description,
        category,
        date,
        sum,
      };

      setSpends((prevSpends) => [...prevSpends, newSpend]);

      setNewSpendDescription("");
      setNewSpendCategory("");
      setNewSpendDate("");
      setNewSpendSum("");
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
        spends,
        isSpendSelected, setIsSpendSelected,
        handleSendEditClick,
        addSpend, deleteSpend,
        newSpendDescription, setNewSpendDescription,
        newSpendCategory, setNewSpendCategory,
        newSpendDate, setNewSpendDate,
        newSpendSum, setNewSpendSum,
        isCategorySelected, setIsCategorySelected,
        handleCategoryClick,
      }}>
      {children}
    </SpendsContext.Provider>
  )
}