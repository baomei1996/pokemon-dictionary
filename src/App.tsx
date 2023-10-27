import { Routes, Route, BrowserRouter } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import DetailPage from "./pages/DetailPage";
import { HelmetProvider } from "react-helmet-async";

function App() {
    return (
        <BrowserRouter>
            <HelmetProvider>
                <Routes>
                    <Route index element={<IndexPage />} />
                    <Route path="/detail/:name" element={<DetailPage />} />
                </Routes>
            </HelmetProvider>
        </BrowserRouter>
    );
}

export default App;
