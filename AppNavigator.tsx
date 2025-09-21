import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking, TouchableOpacity, Text } from 'react-native';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';
import CreateUrlScreen from './src/CreateUrlScreen';
import { ThemeContext } from './src/theme/ThemeContext';

// 在文件顶部添加类型声明
declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Settings: undefined;
      CreateUrl: undefined;
    }
  }
}

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  CreateUrl: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { backgroundColor, textColor } = useContext(ThemeContext);
  const [url, setUrl] = useState<string | null>(null);
  const [urlParams, setUrlParams] = useState<{[key: string]: string} | null>(null);

  useEffect(() => {
    // 处理应用启动时的URL
    const handleInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleUrl(initialUrl);
      }
    };

    // 处理应用运行时接收到的URL
    const handleUrlEvent = (event: { url: string }) => {
      handleUrl(event.url);
    };

    handleInitialUrl();
    
    const subscription = Linking.addEventListener('url', handleUrlEvent);
    
    return () => {
      subscription.remove();
    };
  }, []);

  const handleUrl = (url: string) => {
    setUrl(url);
    // 在实际应用中，你可能想要导航到特定页面
    // navigation.navigate('Home');
    
    // 解析URL参数
    if (url.includes('?')) {
      const [, queryString] = url.split('?');
      const params = queryString.split('&').reduce((acc, part) => {
        const [key, value] = part.split('=');
        acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
        return acc;
      }, {} as {[key: string]: string});
      setUrlParams(params);
    } else {
      setUrlParams(null);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: backgroundColor as any,
          },
          headerTintColor: textColor as any,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          options={{ title: '首页' }}
        >
          {(props) => <HomeScreen {...props} url={url} urlParams={urlParams} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Settings" 
          options={{ title: '设置' }}
        >
          {(props) => <SettingsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen 
          name="CreateUrl" 
          options={({ navigation }) => ({
            title: '新建 Scheme URL',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 12 }}>
                <Text style={{ color: '#007AFF' }}>返回</Text>
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => <CreateUrlScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;