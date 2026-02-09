import GlobalStyle from "../src/components/GlobalStyles";
import AppRoutes from "./AppRoutes";
import AuthProvider from "./context/AuthProvider";

function App() {
    return (
        <>
            <AuthProvider>
                <GlobalStyle />
                <AppRoutes />
            </AuthProvider>
        </>
    );
}

export default App;
