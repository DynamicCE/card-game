interface StorageData {
  purchasedCategories: string[];
  settings: {
    soundEffects: boolean;
    notifications: boolean;
    language: 'tr' | 'en';
  };
}

const STORAGE_KEY = 'do-or-drink-data';

export const getStorageData = (): StorageData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return {
      purchasedCategories: [],
      settings: {
        soundEffects: true,
        notifications: false,
        language: 'tr'
      }
    };
  }
  return JSON.parse(data);
};

export const setStorageData = (data: StorageData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

type SettingsKey = keyof StorageData['settings'];
type SettingsValue<K extends SettingsKey> = StorageData['settings'][K];

export const updateSettings = <K extends SettingsKey>(
  key: K,
  value: SettingsValue<K>
) => {
  const data = getStorageData();
  data.settings[key] = value;
  setStorageData(data);
};

export const addPurchasedCategory = (categoryId: string) => {
  const data = getStorageData();
  if (!data.purchasedCategories.includes(categoryId)) {
    data.purchasedCategories.push(categoryId);
    setStorageData(data);
  }
};

export const isPurchased = (categoryId: string): boolean => {
  const data = getStorageData();
  return data.purchasedCategories.includes(categoryId);
};