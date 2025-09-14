import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Appearance } from 'react-native';

const SettingsScreen: React.FC = () => {
  // 获取系统默认主题
  const systemTheme = Appearance.getColorScheme();
  // 初始化状态，优先使用系统主题，如果没有则默认为light
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

  const toggleTheme = (value: boolean) => {
    setIsDarkMode(value);
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
      <Text style={[styles.content, { color: isDarkMode ? '#ccc' : '#666' }]}>
        {isDarkMode ? '深色模式已开启' : '深色模式已关闭'}
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