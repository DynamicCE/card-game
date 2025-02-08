
import { getStorageData, updateSettings } from "@/utils/storage";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { User, LogOut, CreditCard } from "lucide-react";

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
      
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarFallback className="text-4xl">
            <User />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">Misafir Kullanıcı</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Satın Alınan Paketler
          </h3>
          {purchasedCategories.length > 0 ? (
            <div className="grid gap-2">
              {purchasedCategories.map(category => (
                <div key={category.id} className="flex items-center gap-2 p-2 bg-secondary/10 rounded-lg">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Henüz satın alınmış paket bulunmuyor.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Ayarlar</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Ses Efektleri</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSetting('soundEffects')}
              >
                {settings.soundEffects ? 'Açık' : 'Kapalı'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bildirimler</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSetting('notifications')}
              >
                {settings.notifications ? 'Açık' : 'Kapalı'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dil</span>
              <Button
                variant="outline"
                size="sm"
                onClick={changeLanguage}
              >
                {settings.language === 'tr' ? 'Türkçe' : 'English'}
              </Button>
            </div>
          </div>
        </div>

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
