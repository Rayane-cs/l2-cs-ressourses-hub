import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

interface GuestDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuestDownloadDialog({ open, onOpenChange }: GuestDownloadDialogProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[95vw] max-w-[400px] rounded-[2rem] p-0 overflow-hidden border-none bg-background/95 backdrop-blur-md shadow-2xl">
        <div className="p-8 pb-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 ring-4 ring-primary/5">
            <UserPlus className="w-8 h-8" />
          </div>
          
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-2xl sm:text-3xl font-black tracking-tight text-foreground text-center">
              {t.downloadRestricted.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-base sm:text-lg leading-relaxed text-center px-2">
              {t.downloadRestricted.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <div className="p-8 pt-0 flex flex-col gap-3 w-full">
          <AlertDialogAction
            onClick={() => navigate("/auth?mode=signup")}
            className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 h-12 sm:h-14 transition-all font-bold text-base sm:text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <span>{t.downloadRestricted.createAccount}</span>
          </AlertDialogAction>
          
          <AlertDialogCancel className="w-full rounded-2xl border-border bg-muted/30 hover:bg-muted/50 hover:text-foreground h-12 sm:h-14 transition-all text-base sm:text-lg m-0 border-none font-medium text-muted-foreground active:scale-[0.98]">
            {t.downloadRestricted.continueGuest}
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
