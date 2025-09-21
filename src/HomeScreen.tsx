import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Linking } from 'react-native';
import { ThemeContext } from './theme/ThemeContext';
import storage, { SavedUrl } from './storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';

interface HomeScreenProps extends NativeStackScreenProps<RootStackParamList, 'Home'> {
  url: string | null;
  urlParams: { [key: string]: string } | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, url, urlParams }) => {
  const { backgroundColor, textColor } = useContext(ThemeContext);
  const openTestUrl = () => {
    Alert.alert(
      '测试说明',
      '请在手机浏览器中访问以下链接来测试：\n\nschemeurl://test?param1=value1&param2=value2',
      [
        { text: '确定' }
      ]
    );
  };

  const goToSettings = () => {
    navigation.navigate('Settings');
  };

  const goToCreateUrl = () => {
    navigation.navigate('CreateUrl');
  };

  const [saved, setSaved] = useState<SavedUrl[]>([]);

  useEffect(() => {
    const load = async () => {
      const list = await storage.getSavedUrls();
      setSaved(list);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      load();
    });

    // initial load
    load();

    return unsubscribe;
  }, []);

  const handleDelete = async (id: string) => {
    await storage.removeUrl(id);
    const list = await storage.getSavedUrls();
    setSaved(list);
  };

  const openSaved = async (item: SavedUrl) => {
    try {
      const supported = await Linking.canOpenURL(item.url);
      if (supported) {
        await Linking.openURL(item.url);
      } else {
        Alert.alert('无法打开', `无法打开 URL: ${item.url}`);
      }
    } catch (e) {
      Alert.alert('错误', '打开 URL 时出错');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor as any }]}> 
      <View style={[styles.header, { backgroundColor: backgroundColor === '#f5f5f5' ? '#fff' : '#1e1e1e' }]}>
        <Text style={[styles.title, { color: textColor as any }]}>首页</Text>
        <Text style={[styles.subtitle, { color: textColor === '#333' ? '#666' : '#ccc' }]}>Scheme URL Handler</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.newCard} onPress={goToCreateUrl}>
          <Text style={styles.newCardLabel}>新建Scheme URL</Text>
          <Text style={styles.newCardPlus}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openTestUrl}>
          <Text style={styles.buttonText}>测试说明</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={goToSettings}>
          <Text style={styles.buttonText}>设置</Text>
        </TouchableOpacity>

        {saved.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>已保存的 Scheme URL</Text>
            {saved.map(item => (
              <View key={item.id} style={styles.savedRow}>
                <TouchableOpacity style={{flex:1}} onPress={() => openSaved(item)}>
                  <Text style={styles.paramKey}>{item.name}</Text>
                  <Text style={styles.paramValueSmall}>{item.url}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                  <Text style={{color:'#ff3b30'}}>删除</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {url && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>接收到的URL:</Text>
            <Text style={styles.urlText}>{url}</Text>
          </View>
        )}

        {urlParams && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>URL参数:</Text>
            {Object.entries(urlParams).map(([key, value]) => (
              <View key={key} style={styles.paramRow}>
                <Text style={styles.paramKey}>{key}:</Text>
                <Text style={styles.paramValue}>{value}</Text>
              </View>
            ))}
          </View>
        )}

        {!url && (
          <View style={styles.card}>
            <Text style={styles.infoText}>等待接收URL...</Text>
            <Text style={styles.infoTextSmall}>请通过浏览器访问 schemeurl://test?param1=value1&param2=value2 来测试</Text>
          </View>
        )}
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  newCardLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  newCardPlus: {
    fontSize: 50,
    color: '#007AFF',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  urlText: {
    fontSize: 16,
    color: '#666',
    flexWrap: 'wrap',
  },
  paramRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  paramKey: {
    fontWeight: 'bold',
    width: 100,
    color: '#333',
  },
  paramValue: {
    flex: 1,
    color: '#666',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoTextSmall: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paramValueSmall: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 5,
  },
});

export default HomeScreen;