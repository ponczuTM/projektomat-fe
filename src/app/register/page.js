"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";

// Importy shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  
  // Stan formularza
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Coś poszło nie tak podczas rejestracji");
      }

      // Zapisujemy token (opcjonalnie, zależy od Twojej strategii auth)
      localStorage.setItem("token", data.token);
      
      // Przekierowanie po sukcesie
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-slate-200 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Utwórz konto
            </CardTitle>
          <CardDescription>
            Wprowadź dane, aby zarejestrować się w systemie
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {/* Komunikat o błędzie */}
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            {/* Pole Imię */}
            <div className="grid gap-2">
              <Label htmlFor="name">Imię</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Jan Kowalski"
                  type="text"
                  required
                  className="pl-10"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Pole Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  placeholder="twoj@email.com"
                  type="email"
                  required
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Pole Hasło */}
            <div className="grid gap-2">
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full font-semibold" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Tworzenie konta...
                </>
              ) : (
                "Zarejestruj się"
              )}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Masz już konto?{" "}
              <Link 
                href="/login" 
                className="text-primary font-medium hover:underline underline-offset-4"
              >
                Zaloguj się
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}