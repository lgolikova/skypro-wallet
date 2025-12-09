import GlobalStyles from "../src/components/GlobalStyles";
import AppRoutes from "./AppRoutes";
import { SpendsProvider } from "./context/SpendsProvider";


function App() {
    return (
        <SpendsProvider>
            <GlobalStyles />
            <AppRoutes />
        </SpendsProvider>
    );
}

export default App;
