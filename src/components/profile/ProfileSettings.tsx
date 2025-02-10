
import { Button } from "@/components/ui/button";
import { Settings } from "@/utils/storage";

interface ProfileSettingsProps {
  settings: Settings;
  onToggleSetting: (key: keyof Settings) => void;
  onChangeLanguage: () => void;
}

export const ProfileSettings = ({ settings, onToggleSetting, onChangeLanguage }: ProfileSettingsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Ayarlar</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Ses Efektleri</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleSetting('soundEffects')}
          >
            {settings.soundEffects ? 'Açık' : 'Kapalı'}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Bildirimler</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleSetting('notifications')}
          >
            {settings.notifications ? 'Açık' : 'Kapalı'}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Dil</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onChangeLanguage}
          >
            {settings.language === 'tr' ? 'Türkçe' : 'English'}
          </Button>
        </div>
      </div>
    </div>
  );
};
