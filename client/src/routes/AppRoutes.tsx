import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import MeetingsPage from "@/pages/MeetingsPage";
import { useAppSelector } from "@/store/hooks";
import type { ReactNode } from "react";
import RegisterPage from "@/pages/RegisterPage";



const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};


const AppRoutes = () => {
  return (
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/meetings"
            element={
              <PrivateRoute>
                <MeetingsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
};

export default AppRoutes;
