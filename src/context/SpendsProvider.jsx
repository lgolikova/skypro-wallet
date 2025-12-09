import { useState, useEffect } from "react";
import { SpendsContext } from "./SpendsContext";
import { transactions } from "../data";


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

  const handleSendClick = (sendId) => {
    // console.log(`кликнули по строчке с id=${sendId}`);
    setIsSpendSelected(sendId);
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

  useEffect(() => {
    localStorage.setItem("spends", JSON.stringify(spends));
  }, [spends]);

  
  return (
    <SpendsContext.Provider
      value={{
        spends,
        isSpendSelected, setIsSpendSelected,
        handleSendClick,
        addSpend,
        newSpendDescription, setNewSpendDescription,
        newSpendCategory, setNewSpendCategory,
        newSpendDate, setNewSpendDate,
        newSpendSum, setNewSpendSum,
      }}>
      {children}
    </SpendsContext.Provider>
  )
}