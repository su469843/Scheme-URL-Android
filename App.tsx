/**
 * Scheme URL Handler App with Navigation
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { Alert, Linking, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logInfo, logError } from './src/logger';

function App() {
  useEffect(() => {
    (async () => {
      try {
        const seen = await AsyncStorage.getItem('@agreed');
        if (!seen) {
          Alert.alert(
            '用户协议',
            '1. 本应用使用Apache License协议，如有使用源代码请遵守\n2. 请勿将本应用用于非法用途！！\n3. 本应用基于React Native开发，如有任何疑惑/问题请至 github 查看并提出\n4. 本应用的所有权和解释权归开发者所有',
            [
              { text: '不同意', style: 'cancel', onPress: () => {
                BackHandler.exitApp();
                logInfo('用户不同意用户协议，退出应用');
              } },
              {
                text: '同意',
                onPress: async () => {
                  try { 
                    await AsyncStorage.setItem('@agreed', '1'); 
                    logInfo('用户同意用户协议');
                  } catch (e) {
                    logError(`保存用户协议同意状态失败: ${e}`);
                  }
                }
              }
            ],
            { cancelable: false }
          );
        } else {
          logInfo('应用启动');
        }
      } catch (e) {
        logError(`检查用户协议状态失败: ${e}`);
      }
    })();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
