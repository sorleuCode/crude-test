import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const LoginPage = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await dispatch(loginUser({ email, password }));
    setIsLoading(false);

    if (loginUser.fulfilled.match(result)) {
      navigate("/meetings");
    } else {
      setError("Login failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-background text-foreground">
      <div className="absolute top-4 right-4">
      <ThemeToggle />
    </div>
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register here
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
