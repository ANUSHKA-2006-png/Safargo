import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { AppShell } from "../components/layout/AppShell";
import { Admin } from "../pages/Admin";
import { BudgetPlanner } from "../pages/BudgetPlanner";
import { Chatbot } from "../pages/Chatbot";
import { Dashboard } from "../pages/Dashboard";
import { Landing } from "../pages/Landing";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { Recommendations } from "../pages/Recommendations";
import { Register } from "../pages/Register";
import { TripPlanner } from "../pages/TripPlanner";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripPlanner />} />
          <Route path="/budget" element={<BudgetPlanner />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
