import { Alert, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// 检查更新的API端点
const UPDATE_CHECK_URL = 'https://raw.githubusercontent.com/su469843/Scheme-URL-Android/main/log/version.json';

// 当前应用版本信息
const CURRENT_VERSION = '1.0.0';
const CURRENT_VERSION_CODE = 1;

interface VersionInfo {
  version: string;
  versionCode: number;
  releaseDate: string;
  downloads: {
    arm64: {
      filename: string;
      size: number;
      md5: string;
      abi: string;
      downloadUrl: string;
    };
    armv7: {
      filename: string;
      size: number;
      md5: string;
      abi: string;
      downloadUrl: string;
    };
  };
}

/**
 * 检查是否有新版本可用
 */
export const checkForUpdate = async (): Promise<void> => {
  try {
    // 获取设备架构
    const deviceAbi = DeviceInfo.supportedAbisSync()[0];
    
    // 获取当前应用版本
    const currentVersion = CURRENT_VERSION;
    const currentVersionCode = CURRENT_VERSION_CODE;
    
    // 从服务器获取最新版本信息
    const response = await fetch(UPDATE_CHECK_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const versionInfo: VersionInfo = await response.json();
    
    // 比较版本号
    if (versionInfo.versionCode > currentVersionCode) {
      // 有新版本，显示更新提示
      showUpdateAlert(
        currentVersion,
        versionInfo.version,
        versionInfo.downloads.arm64.downloadUrl,
        versionInfo.downloads.armv7.downloadUrl,
        deviceAbi
      );
    }
  } catch (error) {
    console.error('检查更新失败:', error);
    // 静默失败，不向用户显示错误
  }
};

/**
 * 显示更新提示弹窗
 */
const showUpdateAlert = (
  currentVersion: string,
  newVersion: string,
  arm64DownloadUrl: string,
  armv7DownloadUrl: string,
  deviceAbi: string
) => {
  const downloadUrl = deviceAbi.includes('arm64') ? arm64DownloadUrl : armv7DownloadUrl;
  
  Alert.alert(
    '发现新版本',
    `当前版本: ${currentVersion}\n最新版本: ${newVersion}\n\n发现新版本，建议您更新以获得更好的体验。`,
    [
      {
        text: '稍后更新',
        style: 'cancel',
      },
      {
        text: '立即更新',
        onPress: () => {
          Linking.openURL(downloadUrl).catch(() => {
            Alert.alert('下载失败', '无法打开下载链接，请手动下载更新。');
          });
        },
      },
    ],
    { cancelable: true }
  );
};