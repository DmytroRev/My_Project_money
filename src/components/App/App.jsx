import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { AddTransaction } from "../AddTransactions/AddTransactions";
import { Suspense } from "react";

export const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense>
        <Routes>
          <Route path="" element={<AddTransaction />} />
        </Routes>
      </Suspense>
    </div>
  );
};
