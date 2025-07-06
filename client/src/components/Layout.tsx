import { ReactNode } from "react";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast(); 

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-foreground flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-background dark:bg-zinc-900 sticky top-0 z-20 border-b">
        <div className="text-sm sm:text-xl font-semibold">📝 Meeting Manager</div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="destructive"
            size="sm"
            className="gap-1"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
    </div>
  );
};

export default Layout;
