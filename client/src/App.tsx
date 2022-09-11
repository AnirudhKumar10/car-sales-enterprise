import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AddSalesDetailPage } from "./pages/AddSalesDetailPage";
import { SalesDetailPage } from "./pages/SalesDetailPage";
import { SalesTablePage } from "./pages/SalesTablePage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="p-8">
      <Routes>
        <Route path="/" element={<SalesTablePage />} />

        <Route path="/sales-detail/:sales_id" element={<SalesDetailPage />} />

        <Route path="/add-sales-detail" element={<AddSalesDetailPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
