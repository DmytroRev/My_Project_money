import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
// import { AddTransaction } from "../AddTransactions/AddTransactions";
import { Suspense } from "react";
import { HomePage } from "../../pages/HomePage/HomePage";
import { HistoryPage } from "../../pages/HistoryPage/HistoryPage";

export const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={HistoryPage} />
        </Routes>
      </Suspense>
    </div>
  );
};
