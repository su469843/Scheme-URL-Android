import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';


type CreateUrlScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateUrl'>;

const CreateUrlScreen: React.FC<CreateUrlScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleConfirm = async () => {
    if (!name || !url) {
      Alert.alert('错误', '名称和Scheme URL不能为空');
      return;
    }
    const item: SavedUrl = { id: uuidv4(), name, url };
    await storage.saveUrl(item);
    Alert.alert('成功', `已保存: ${name}\nURL: ${url}`, [
      { text: '确定', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新建 Scheme URL</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>请填入名称</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="例如：我的测试URL"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>请填入Scheme URL</Text>
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="例如：myapp://home/user/123"
          autoCapitalize="none"
          keyboardType="url"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>确认</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateUrlScreen;
import storage, { SavedUrl } from './storage';
import { v4 as uuidv4 } from 'uuid';