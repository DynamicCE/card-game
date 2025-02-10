
import { getStorageData, updateSettings } from "@/utils/storage";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { ProfileHeader } from "./profile/ProfileHeader";
import { PurchasedPackages } from "./profile/PurchasedPackages";
import { ProfileSettings } from "./profile/ProfileSettings";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const UserProfile = ({ purchasedCategories }: { purchasedCategories: Category[] }) => {
  const [settings, setSettings] = useState(getStorageData().settings);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      const newValue = !settings[key];
      updateSettings(key, newValue);
      setSettings(prev => ({ ...prev, [key]: newValue }));
    }
  };

  const changeLanguage = () => {
    const newLang = settings.language === 'tr' ? 'en' : 'tr';
    updateSettings('language', newLang);
    setSettings(prev => ({ ...prev, language: newLang }));
  };

  const handleLogout = () => {
    toast({
      title: "Çıkış Yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    navigate("/");
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Profil</SheetTitle>
      </SheetHeader>
      
      <ProfileHeader />

      <div className="space-y-6">
        <PurchasedPackages purchasedCategories={purchasedCategories} />

        <ProfileSettings 
          settings={settings}
          onToggleSetting={toggleSetting}
          onChangeLanguage={changeLanguage}
        />

        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </SheetContent>
  );
};
