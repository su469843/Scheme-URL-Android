import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedUrl {
  id: string;
  name: string;
  url: string;
}

const KEY = '@saved_urls';

export const getSavedUrls = async (): Promise<SavedUrl[]> => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedUrl[];
  } catch (e) {
    return [];
  }
};

export const saveUrl = async (item: SavedUrl): Promise<void> => {
  try {
    const list = await getSavedUrls();
    list.unshift(item);
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    // ignore
  }
};

export const removeUrl = async (id: string): Promise<void> => {
  try {
    const list = await getSavedUrls();
    const next = list.filter(i => i.id !== id);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    // ignore
  }
};

export default { getSavedUrls, saveUrl, removeUrl };
