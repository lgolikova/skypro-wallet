import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditSpendPage from "./pages/EditSpendPage";
import LoginPage from "./pages/LoginPage";
import NewSpendPage from "./pages/NewSpendPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import SpendAnalysisPage from "./pages/SpendAnalysisPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route path="spend/new" element={<NewSpendPage />} />
                <Route path="spend/:id" element={<EditSpendPage />} />
            </Route>
            <Route path="/spend-analysis" element={<SpendAnalysisPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
