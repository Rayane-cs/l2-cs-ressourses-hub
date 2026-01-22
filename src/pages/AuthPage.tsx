import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/contexts/ThemeColorContext";
import { useTheme } from "next-themes";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome, 
  Facebook, 
  Smartphone, 
  UserCircle,
  Moon,
  Sun,
  Globe,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { t, lang, setLang } = useLanguage();
  const { setGuest } = useAuth();
  const { themeColor, setThemeColor } = useThemeColor();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          // Check if the user exists in our profiles table to provide a specific error
          const { data: profileExists } = await supabase
            .from("profiles")
            .select("id")
            .eq("email", email)
            .maybeSingle();

          if (profileExists) {
            toast.error(t.auth.wrongPassword);
          } else {
            toast.error(t.auth.invalidAccount);
          }
          return;
        }
        toast.success(t.auth.welcomeBack);
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: fullName,
              email: email, // Sync email to metadata
              language: lang,
              theme_color: themeColor,
            }
          }
        });
        if (error) throw error;
        toast.success(t.auth.signUpSuccess);
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = () => {
    toast.info("This feature is coming soon!");
  };

  const handleGuest = () => {
    setGuest(true);
    navigate("/");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {/* Floating Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full bg-background/50 backdrop-blur-sm border-primary/20"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setThemeColor(themeColor === "red" ? "blue" : "red")}
          className="rounded-full bg-background/50 backdrop-blur-sm border-primary/20"
        >
          <div className={`w-3 h-3 rounded-full ${themeColor === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLang(lang === "en" ? "fr" : "en")}
          className="rounded-full px-3 bg-background/50 backdrop-blur-sm border-primary/20 flex gap-2 items-center"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs font-medium uppercase">{lang}</span>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-background/40 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle shine effect */}
          <div className="absolute -inset-x-20 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-1000" />
          
          <div className="text-center mb-8">
            <motion.h1 
              key={lang}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50"
            >
              {isLogin ? t.auth.welcomeBack : t.auth.createAccount}
            </motion.h1>
            <p className="text-muted-foreground text-sm">{t.auth.subtitle}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence initial={false}>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 relative px-0.5 pt-0.5"
                >
                  <label className="text-sm font-medium ml-1 flex items-center gap-2 mb-1.5">
                    <UserCircle className="w-4 h-4 text-primary" />
                    {t.auth.fullName}
                  </label>
                  <Input
                    type="text"
                    placeholder={t.auth.fullName}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="bg-background/20 border-white/10 hover:border-white/20 focus-visible:ring-primary focus-visible:ring-offset-0 focus:bg-background/40 transition-all rounded-xl h-12 placeholder:text-muted-foreground/50 px-4"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1 flex items-center gap-2 mb-1.5">
                <Mail className="w-4 h-4 text-primary" />
                {t.auth.email}
              </label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/20 border-white/10 hover:border-white/20 focus-visible:ring-primary focus-visible:ring-offset-0 focus:bg-background/40 transition-all rounded-xl h-12 placeholder:text-muted-foreground/50 px-4"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1 flex items-center gap-2 mb-1.5">
                <Lock className="w-4 h-4 text-primary" />
                {t.auth.password}
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/20 border-white/10 hover:border-white/20 focus-visible:ring-primary focus-visible:ring-offset-0 focus:bg-background/40 transition-all rounded-xl h-12 placeholder:text-muted-foreground/50 px-4"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 rounded-xl bg-primary hover:primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (isLogin ? t.auth.signIn : t.auth.signUp)}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background/40 backdrop-blur-sm px-2 text-muted-foreground">{t.auth.or}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button
              variant="outline"
              onClick={handleSocialLogin}
              className="bg-background/50 border-white/10 hover:bg-white/5 rounded-xl h-12 transition-all opacity-50 cursor-not-allowed group/btn relative"
              title="Coming Soon"
            >
              <Chrome className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleSocialLogin}
              className="bg-background/50 border-white/10 hover:bg-white/5 rounded-xl h-12 transition-all opacity-50 cursor-not-allowed relative"
              title="Coming Soon"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              onClick={handleSocialLogin}
              className="bg-background/50 border-white/10 hover:bg-white/5 rounded-xl h-12 transition-all opacity-50 cursor-not-allowed relative"
              title="Coming Soon"
            >
              <Smartphone className="w-5 h-5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={handleGuest}
            className="w-full mb-4 text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 rounded-xl transition-all h-11"
          >
            <UserCircle className="w-5 h-5" />
            {t.auth.guest}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? t.auth.noAccount : t.auth.haveAccount}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline decoration-2 underline-offset-4"
              >
                {isLogin ? t.auth.signUp : t.auth.signIn}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
