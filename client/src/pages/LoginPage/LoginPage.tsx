import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  loading: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await onLogin(username, password);
    if (!success) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Login
            </h1>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
              <p className="text-sm text-gray-700 font-medium">
                Demo Credentials:
              </p>
              <p className="text-sm text-gray-600">Username: johnd</p>
              <p className="text-sm text-gray-600">Password: m38rmF$</p>
            </div>

            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={error && !username ? "Username is required" : ""}
              disabled={loading}
              placeholder="Enter username"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? "Password is required" : ""}
              disabled={loading}
              placeholder="Enter password"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" disabled={loading} fullWidth>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
