import { ReactNode } from "react";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-muted">
        <h1 className="text-lg font-bold">📝 Meeting Manager</h1>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
