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
    const [isSpendSelected, setIsSpendSelected] = useState("");

    const handleSendClick = (sendId) => {
        // console.log(`кликнули по строчке с id=${sendId}`);
        setIsSpendSelected(sendId);
    };

    return (
        <Routes>
            <Route path="/" element={<MainPage transactions={transactions} isSpendSelected={isSpendSelected} onclick={handleSendClick}/>}>
                <Route path="spend/new" element={<NewSpendPage />} />
                <Route path="spend/:id" element={<EditSpendPage isSpendSelected={isSpendSelected}/>} />
            </Route>
            <Route path="/spend-analysis" element={<SpendAnalysisPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
