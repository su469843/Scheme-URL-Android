/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import NavigationBar from './src/NavigationBar';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';
import AddSchemeScreen from './src/AddSchemeScreen';
import EULA from './src/EULA';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showEULA, setShowEULA] = useState(true);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (showEULA) {
        // 如果用户协议弹窗显示中，阻止返回操作
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [showEULA]);

  const handleAgree = () => {
    setShowEULA(false);
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

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <EULA visible={showEULA} onAgree={handleAgree} onDisagree={handleDisagree} />
      {!showEULA && <AppContent />}
    </>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddScheme, setShowAddScheme] = useState(false);
  const [schemes, setSchemes] = useState<{name: string, url: string}[]>([]);

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
  const handleAddScheme = (name: string, url: string) => {
    setSchemes(prev => [...prev, {name, url}]);
  };

  // 如果需要显示添加Scheme界面，则显示该界面
  if (showAddScheme) {
    return <AddSchemeScreen onBack={handleBackToHome} onAddScheme={handleAddScheme} />;
  }

  return (
    <View style={styles.container}>
      {activeTab === 'home' ? (
        <HomeScreen onAddSchemePress={handleAddSchemePress} schemes={schemes} />
      ) : (
        <SettingsScreen />
      )}
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;