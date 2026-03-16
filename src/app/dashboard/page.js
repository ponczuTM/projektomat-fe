"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  Loader2,
  Calendar
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      // 1. Jeśli brak tokenu, natychmiast wyrzuć do logowania
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // 2. Pobierz aktualne dane z chronionej trasy /me
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Sesja wygasła");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Loader podczas sprawdzania sesji
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">Autoryzacja...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Prosty Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary text-primary-foreground p-1 rounded">
              <LayoutDashboard size={20} />
            </div>
            <span>AppPanel</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Wyloguj
          </Button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Witaj z powrotem, {user?.name}! 👋</h1>
          <p className="text-muted-foreground">Oto podsumowanie Twojego profilu i statusu konta.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Karta Profilu */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Dane profilowe
              </CardTitle>
              <CardDescription>Informacje o Twoim koncie użytkownika</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-full">
                    <User className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Imię i nazwisko</span>
                </div>
                <span className="text-sm font-semibold">{user?.name}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-full">
                    <Mail className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Adres Email</span>
                </div>
                <span className="text-sm font-semibold">{user?.email}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-full">
                    <Calendar className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">ID Użytkownika</span>
                </div>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                  {user?._id || user?.id}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Karta Statusu */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                Bezpieczeństwo
              </CardTitle>
              <CardDescription>Status Twojej sesji i uprawnień</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-green-900">Sesja aktywna</p>
                  <p className="text-xs text-green-700">Twój token JWT jest poprawny i wygaśnie za 7 dni.</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Szybkie akcje</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full">Zmień hasło</Button>
                  <Button variant="outline" size="sm" className="w-full text-destructive hover:bg-destructive/5">Usuń konto</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}