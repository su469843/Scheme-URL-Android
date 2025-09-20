/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

<<<<<<< HEAD
import { StatusBar, StyleSheet, useColorScheme, View, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import NavigationBar from './src/NavigationBar';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';
import AddSchemeScreen from './src/AddSchemeScreen';
import EULA from './src/EULA';
import { getEulaAccepted, getSchemes, saveEulaAccepted, saveSchemes } from './src/StorageUtil';
import { checkForUpdate } from './src/UpdateUtil';
=======
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
>>>>>>> 741bcefb71fc25e9c9c9b835f563754455cd5bc1

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showEULA, setShowEULA] = useState(false); // 默认不显示EULA
  const [loading, setLoading] = useState(true); // 添加加载状态
<<<<<<< HEAD

  // 应用启动时检查用户协议接受状态
  useEffect(() => {
    const checkEulaStatus = async () => {
      try {
        const accepted = await getEulaAccepted();
        setShowEULA(!accepted); // 如果未接受协议则显示弹窗
      } catch (error) {
        console.error('检查用户协议状态失败:', error);
        setShowEULA(true); // 出错时默认显示协议
      } finally {
        setLoading(false); // 加载完成
      }
    };

    checkEulaStatus();
  }, []);

  // 应用启动时检查更新
  useEffect(() => {
    // 在用户协议接受后检查更新
    if (!showEULA && !loading) {
      checkForUpdate();
    }
  }, [showEULA, loading]);

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

  // 在加载期间不渲染内容
  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <EULA visible={showEULA} onAgree={handleAgree} onDisagree={handleDisagree} />
      {!showEULA && <AppContent />}
    </>
  );
}

function AppContent() {
=======
>>>>>>> 741bcefb71fc25e9c9c9b835f563754455cd5bc1
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 741bcefb71fc25e9c9c9b835f563754455cd5bc1
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;