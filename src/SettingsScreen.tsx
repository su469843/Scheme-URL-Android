import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';
import { ThemeContext } from './theme/ThemeContext';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const { theme, toggleTheme, backgroundColor, textColor } = useContext(ThemeContext);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const showAbout = () => {
    Alert.alert(
      '关于',
      'Scheme URL Handler v1.0\n\n这是一个处理自定义URL协议的示例应用。',
      [{ text: '确定' }]
    );
  };

  const goBackToHome = () => {
    // pop back to the root/home to avoid stacking multiple Home screens
    navigation.popToTop();
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor as any }]}> 
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor as any }]}>设置</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={goBackToHome}>
          <Text style={styles.buttonText}>返回首页</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通用设置</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>启用通知</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>深色模式</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>关于</Text>
          
          <TouchableOpacity style={styles.settingItemButton} onPress={showAbout}>
            <Text style={styles.settingText}>关于应用</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>URL Scheme</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>当前Scheme</Text>
            <Text style={styles.settingValue}>schemeurl</Text>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>使用说明</Text>
            <Text style={styles.settingValueSmall}>通过 schemeurl://... 访问应用</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItemButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
  settingValueSmall: {
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
    flex: 1,
  },
});

export default SettingsScreen;