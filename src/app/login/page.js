"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Github, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(""); 

    try {
      // Upewnij się, że URL to http://localhost:8080/api/auth/login
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // DEBUG: Sprawdzamy czy odpowiedź to JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textError = await response.text();
        console.error("Serwer zwrócił HTML zamiast JSON:", textError);
        throw new Error("Błąd konfiguracji serwera (otrzymano HTML). Sprawdź adres URL.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Nieprawidłowe dane logowania");
      }

      // Sukces
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      router.push("/dashboard");
      router.refresh();

    } catch (err) {
      setError(err.message);
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#f8fafc,transparent)]"></div>
      </div>

      <div className="w-full max-w-[400px] space-y-6">
        <Card className="border-slate-200/60 shadow-xl bg-white/90 backdrop-blur-sm">
          <form onSubmit={onSubmit}>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Logowanie</CardTitle>
              <CardDescription>
                Wprowadź swoje dane, aby uzyskać dostęp
              </CardDescription>
            </CardHeader>
            
            <CardContent className="grid gap-4">
              {/* Wyświetlanie błędu */}
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="twoj@email.com"
                    required
                    disabled={isLoading}
                    className="pl-10 focus-visible:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Hasło</Label>
                  <button type="button" className="text-xs text-primary hover:underline underline-offset-4">
                    Zapomniałeś hasła?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    disabled={isLoading} 
                    className="pl-10 focus-visible:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full font-semibold shadow-sm" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Autoryzacja...
                  </>
                ) : (
                  "Zaloguj się"
                )}
              </Button>
              
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Lub kontynuuj z
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" type="button" disabled={isLoading} className="hover:bg-slate-50">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline" type="button" disabled={isLoading} className="hover:bg-slate-50">
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Google
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Nie masz konta?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline underline-offset-4">
            Zarejestruj się za darmo
          </Link>
        </p>
      </div>
    </div>
  );
}