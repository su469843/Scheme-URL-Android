import AsyncStorage from '@react-native-async-storage/async-storage';

// 定义存储键名
const STORAGE_KEYS = {
  EULA_ACCEPTED: 'eula_accepted',
  SCHEMES: 'schemes',
  DARK_MODE: 'dark_mode_preference',
};

// 存储用户协议接受状态
export const saveEulaAccepted = async (accepted: boolean) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.EULA_ACCEPTED, JSON.stringify(accepted));
  } catch (error) {
    console.error('保存用户协议状态失败:', error);
  }
};

// 读取用户协议接受状态
export const getEulaAccepted = async (): Promise<boolean> => {
  try {
    const result = await AsyncStorage.getItem(STORAGE_KEYS.EULA_ACCEPTED);
    return result ? JSON.parse(result) : false;
  } catch (error) {
    console.error('读取用户协议状态失败:', error);
    return false;
  }
};

// 存储Scheme列表
export const saveSchemes = async (schemes: {name: string, url: string}[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(schemes));
  } catch (error) {
    console.error('保存Scheme列表失败:', error);
  }
};

// 读取Scheme列表
export const getSchemes = async (): Promise<{name: string, url: string}[]> => {
  try {
    const result = await AsyncStorage.getItem(STORAGE_KEYS.SCHEMES);
    return result ? JSON.parse(result) : [];
  } catch (error) {
    console.error('读取Scheme列表失败:', error);
    return [];
  }
};

// 保存深色模式偏好设置
export const saveDarkModePreference = async (isDarkMode: boolean) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDarkMode));
  } catch (error) {
    console.error('保存深色模式偏好设置失败:', error);
  }
};

// 读取深色模式偏好设置
export const getDarkModePreference = async (): Promise<boolean | null> => {
  try {
    const result = await AsyncStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return result !== null ? JSON.parse(result) : null;
  } catch (error) {
    console.error('读取深色模式偏好设置失败:', error);
    return null;
  }
};