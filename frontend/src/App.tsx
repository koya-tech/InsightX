import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import LoadingSpinner from "./components/Loading";

const NotFound = lazy(() => import("./components/NotFound"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
