
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, CreditCard, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStorageData, updateSettings, isPurchased } from "@/utils/storage";
import { categories } from "@/components/Categories";

const Profile = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(getStorageData().settings);
  const purchasedCategories = categories.filter(cat => isPurchased(cat.id));

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

  return (
    <div className="min-h-screen bg-background text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Button>

        <div className="flex flex-col items-center mb-8">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarFallback className="text-4xl">
              <User />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">Misafir Kullanıcı</h2>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Satın Alınan Paketler
              </CardTitle>
            </CardHeader>
            <CardContent>
              {purchasedCategories.length > 0 ? (
                <div className="grid gap-2">
                  {purchasedCategories.map(category => (
                    <div key={category.id} className="flex items-center gap-2 p-2 bg-secondary/10 rounded-lg">
                      {category.icon}
                      <span>{category.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400">
                  Henüz satın alınmış paket bulunmuyor.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Ayarlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Ses Efektleri</span>
                <Button 
                  variant="outline"
                  onClick={() => toggleSetting('soundEffects')}
                >
                  {settings.soundEffects ? 'Açık' : 'Kapalı'}
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Bildirimler</span>
                <Button 
                  variant="outline"
                  onClick={() => toggleSetting('notifications')}
                >
                  {settings.notifications ? 'Açık' : 'Kapalı'}
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Dil</span>
                <Button 
                  variant="outline"
                  onClick={changeLanguage}
                >
                  {settings.language === 'tr' ? 'Türkçe' : 'English'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
