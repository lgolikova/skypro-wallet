import GlobalStyle from "../src/components/GlobalStyles";
import AppRoutes from "./AppRoutes";

function App() {
    return (
        <AuthProvider>
            <SpendsProvider>
                <GlobalStyle />
                <AppRoutes />
            </SpendsProvider>
        </AuthProvider>
    );
}

export default App;
