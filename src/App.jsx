import GlobalStyle from "../src/components/GlobalStyles";
import AppRoutes from "./AppRoutes";
import AuthProvider from "./context/AuthProvider";
import {SpendsProvider} from "./context/SpendsProvider";


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
