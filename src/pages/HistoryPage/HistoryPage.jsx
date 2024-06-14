import { Suspense } from "react";
import { History } from "../../components/History/History";
import { Outlet } from "react-router-dom";

export const HistoryPage = () => {
  return (
    <div>
      <History />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
