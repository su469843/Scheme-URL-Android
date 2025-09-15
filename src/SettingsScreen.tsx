import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Appearance } from 'react-native';
import { getDarkModePreference, saveDarkModePreference } from './StorageUtil';

const SettingsScreen: React.FC = () => {
  // 获取系统默认主题
  const systemTheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 组件加载时从本地存储读取用户偏好设置
  useEffect(() => {
    const loadDarkModePreference = async () => {
      try {
        const savedPreference = await getDarkModePreference();
        // 如果有保存的偏好设置，则使用它；否则使用系统主题
        if (savedPreference !== null) {
          setIsDarkMode(savedPreference);
        } else {
          setIsDarkMode(systemTheme === 'dark');
        }
      } catch (error) {
        console.error('加载深色模式偏好设置失败:', error);
        // 出错时使用系统主题
        setIsDarkMode(systemTheme === 'dark');
      }
    };

    loadDarkModePreference();
  }, [systemTheme]);

  const toggleTheme = async (value: boolean) => {
    setIsDarkMode(value);
    try {
      await saveDarkModePreference(value);
    } catch (error) {
      console.error('保存深色模式偏好设置失败:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>设置页面</Text>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#000' }]}>深色模式</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>
      <Text style={[styles.content, { color: isDarkMode ? '#ccc' : '#666' }]}>        {isDarkMode ? '深色模式已开启' : '深色模式已关闭'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default SettingsScreen;