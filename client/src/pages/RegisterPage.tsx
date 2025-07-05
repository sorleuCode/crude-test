import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/utils/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const RegisterPage = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
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
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
