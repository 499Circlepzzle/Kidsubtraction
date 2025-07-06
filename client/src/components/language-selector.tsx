import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslation, Language } from "@/lib/i18n/translations";

const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  ja: "日本語",
  zh: "中文",
  ru: "Русский",
  hi: "हिन्दी",
  sw: "Kiswahili",
  am: "አማርኛ",
  yo: "Yorùbá",
  zu: "isiZulu",
  ar: "العربية",
  af: "Afrikaans",
  xh: "isiXhosa",
  st: "Sesotho"
};

export function LanguageSelector() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <Globe className="h-4 w-4" />
          {t('language')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={language === code ? "bg-muted" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}