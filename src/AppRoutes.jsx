import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditSpendPage from "./pages/EditSpendPage";
import LoginPage from "./pages/LoginPage";
import NewSpendPage from "./pages/NewSpendPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import SpendAnalysisPage from "./pages/SpendAnalysisPage";
import { transactions } from "./data";
import { useEffect, useState } from "react";
import { SpendsContext } from "./context/SpendsContext";


function AppRoutes() {
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
    };

    useEffect(() => {
        localStorage.setItem("spends", JSON.stringify(spends));
    }, [spends]);


    return (
        <SpendsContext.Provider
            value={{
                spends,
                isSpendSelected,
                handleSendClick,
                addSpend,
                newSpendDescription, setNewSpendDescription,
                newSpendCategory, setNewSpendCategory,
                newSpendDate, setNewSpendDate,
                newSpendSum, setNewSpendSum,
            }}>
            <Routes>
                <Route path="/" element={<MainPage
                // spends={spends} isSpendSelected={isSpendSelected} onclick={handleSendClick} addSpend={addSpend} newSpendDescription={newSpendDescription} setNewSpendDescription={setNewSpendDescription} newSpendCategory={newSpendCategory} setNewSpendCategory={setNewSpendCategory} newSpendDate={newSpendDate} setNewSpendDate={setNewSpendDate} newSpendSum={newSpendSum} setNewSpendSum={setNewSpendSum}
                 />}>
                    <Route path="spend/new" element={<NewSpendPage />} />
                    <Route path="spend/:id" element={<EditSpendPage isSpendSelected={isSpendSelected} />} />
                </Route>
                <Route path="/spend-analysis" element={<SpendAnalysisPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </SpendsContext.Provider>
    );
}

export default AppRoutes;
