import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditSpendPage from "./pages/EditSpendPage";
import LoginPage from "./pages/LoginPage";
import NewSpendPage from "./pages/NewSpendPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import SpendAnalysisPage from "./pages/SpendAnalysisPage";
import { transactions } from "./data";
import { useState } from "react";


function AppRoutes() {
    const [spends, setSpends] = useState(transactions);

    const [isSpendSelected, setIsSpendSelected] = useState("");
    const [newSpendDescription, setNewSpendDescription] = useState("");
    const [newSpendCategory, setNewSpendCategory] = useState("");
    const [newSpendDate, setNewSpendDate] = useState("");
    const [newSpendSum, setNewSpendSum] = useState("");

    const handleSendClick = (sendId) => {
        console.log(`кликнули по строчке с id=${sendId}`);
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

        console.log("Нажали кнопку 'Добавить новый расход'");
        console.log(spends);
    }

    return (
        <Routes>
            <Route path="/" element={<MainPage spends={spends} isSpendSelected={isSpendSelected} onclick={handleSendClick} addSpend={addSpend} newSpendDescription={newSpendDescription} setNewSpendDescription={setNewSpendDescription} newSpendCategory={newSpendCategory} setNewSpendCategory={setNewSpendCategory} newSpendDate={newSpendDate} setNewSpendDate={setNewSpendDate} newSpendSum={newSpendSum} setNewSpendSum={setNewSpendSum} />}>
                <Route path="spend/new" element={<NewSpendPage />} />
                <Route path="spend/:id" element={<EditSpendPage isSpendSelected={isSpendSelected} />} />
            </Route>
            <Route path="/spend-analysis" element={<SpendAnalysisPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
