import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';

interface HomeScreenProps {
  onAddSchemePress?: () => void;
  schemes?: {name: string, url: string}[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onAddSchemePress, schemes = [] }) => {
  const handleSchemePress = (url: string) => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('错误', '无法打开该链接');
        }
      })
      .catch(err => {
        Alert.alert('错误', '打开链接时发生错误');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>欢迎来到首页</Text>
      <Text style={styles.content}>这是应用的主页内容</Text>
      
      {/* 添加Scheme Url卡片按钮 */}
      <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onAddSchemePress}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>添加Scheme Url</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.plusSign}>+</Text>
        </View>
      </TouchableOpacity>
      
      {/* 显示已添加的Scheme卡片 */}
      {schemes.map((scheme, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.schemeCard} 
          activeOpacity={0.8} 
          onPress={() => handleSchemePress(scheme.url)}
        >
          <View style={styles.schemeCardHeader}>
            <Text style={styles.schemeCardTitle}>{scheme.name}</Text>
          </View>
          <View style={styles.schemeCardBody}>
            <Text style={styles.schemeUrl} numberOfLines={1}>
              {scheme.url}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    width: '80%',
    height: 150,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  cardHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#bbdefb',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d47a1',
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusSign: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  schemeCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  schemeCardHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  schemeCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  schemeCardBody: {
    padding: 15,
  },
  schemeUrl: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;