import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AddSalesDetailPage } from "./pages/AddSalesDetailPage";
import { SalesDetailPage } from "./pages/SalesDetailPage";
import { SalesTablePage } from "./pages/SalesTablePage";

function App() {
  return (
    <div className="p-8">
      <Routes>
        <Route path="/" element={<SalesTablePage />} />

        <Route path="/sales-detail/:sales_id" element={<SalesDetailPage />} />

        <Route path="/add-sales-detail" element={<AddSalesDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
