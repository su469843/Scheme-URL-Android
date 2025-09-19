/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import NavigationBar from './src/components/NavigationBar';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddSchemeScreen from './src/screens/AddSchemeScreen';
import EULA from './src/screens/EULA';
import { getEulaAccepted, getSchemes, saveEulaAccepted, saveSchemes } from './src/utils/StorageUtil';
import { checkForUpdate } from './src/utils/UpdateUtil';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showEULA, setShowEULA] = useState(false); // 默认不显示EULA
  const [loading, setLoading] = useState(true); // 添加加载状态
  const [activeTab, setActiveTab] = useState('home');
  const [showAddScheme, setShowAddScheme] = useState(false);
  const [schemes, setSchemes] = useState<{name: string, url: string}[]>([]);

  // 应用启动时加载已保存的Scheme列表
  useEffect(() => {
    const loadSchemes = async () => {
      try {
        const savedSchemes = await getSchemes();
        setSchemes(savedSchemes);
      } catch (error) {
        console.error('加载Scheme列表失败:', error);
      }
    };

    loadSchemes();
  }, []);

  // 处理添加Scheme Url按钮点击事件
  const handleAddSchemePress = () => {
    setShowAddScheme(true);
  };

  // 处理返回主界面
  const handleBackToHome = () => {
    setShowAddScheme(false);
    setActiveTab('home');
  };

  // 处理添加新的Scheme
  const handleAddScheme = async (name: string, url: string) => {
    const newSchemes = [...schemes, {name, url}];
    setSchemes(newSchemes);
    try {
      await saveSchemes(newSchemes);
    } catch (error) {
      console.error('保存Scheme列表失败:', error);
    }
  };

  // 应用启动时检查用户协议接受状态
  useEffect(() => {
    const checkEulaStatus = async () => {
      try {
        const accepted = await getEulaAccepted();
        setShowEULA(!accepted);
      } catch (error) {
        console.error('检查用户协议状态失败:', error);
        setShowEULA(true);
      } finally {
        setLoading(false);
      }
    };

    checkEulaStatus();
  }, []);

  // 应用启动时检查更新
  useEffect(() => {
    if (!showEULA && !loading) {
      checkForUpdate();
    }
  }, [showEULA, loading]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (showEULA) {
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [showEULA]);

  const handleAgree = async () => {
    try {
      await saveEulaAccepted(true);
      setShowEULA(false);
    } catch (error) {
      console.error('保存用户协议状态失败:', error);
    }
  };

  const handleDisagree = () => {
    Alert.alert(
      '退出应用',
      '您必须同意用户协议才能使用本应用。应用将退出。',
      [
        {
          text: '确定',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <EULA visible={showEULA} onAgree={handleAgree} onDisagree={handleDisagree} />
      {!showEULA && (
        <View style={styles.container}>
          {showAddScheme ? (
            <AddSchemeScreen onBack={handleBackToHome} onAddScheme={handleAddScheme} />
          ) : activeTab === 'home' ? (
            <HomeScreen onAddSchemePress={handleAddSchemePress} schemes={schemes} />
          ) : ( 
            <SettingsScreen />
          )}
          <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;