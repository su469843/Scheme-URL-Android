import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'settings', label: '设置', icon: '⚙️' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text style={[styles.icon, activeTab === tab.id && styles.activeIcon]}>
            {tab.icon}
          </Text>
          <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#e3f2fd', // 浅蓝色背景
    borderTopWidth: 1,
    borderTopColor: '#bbdefb',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#bbdefb', // 激活时的浅蓝色
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
    color: '#0d47a1', // 深蓝色图标
  },
  activeIcon: {
    color: '#0d47a1', // 激活时的深蓝色图标
  },
  tabText: {
    fontSize: 12,
    color: '#0d47a1', // 深蓝色文字
  },
  activeTabText: {
    color: '#0d47a1', // 激活时的深蓝色文字
    fontWeight: 'bold',
  },
});

export default NavigationBar;