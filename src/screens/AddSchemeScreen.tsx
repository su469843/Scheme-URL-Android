import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

interface AddSchemeScreenProps {
  onBack?: () => void;
  onAddScheme?: (name: string, url: string) => void;
}

const AddSchemeScreen: React.FC<AddSchemeScreenProps> = ({ onBack, onAddScheme }) => {
  const [projectName, setProjectName] = useState('');
  const [schemeUrl, setSchemeUrl] = useState('');

  const handleConfirm = () => {
    if (!projectName.trim() || !schemeUrl.trim()) {
      Alert.alert('提示', '请填写所有字段');
      return;
    }
    
    // 调用父组件传递的添加函数
    onAddScheme && onAddScheme(projectName, schemeUrl);
    
    // 清空输入框
    setProjectName('');
    setSchemeUrl('');
    
    // 返回首页
    onBack && onBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>返回</Text>
      </TouchableOpacity>
      <Text style={styles.title}>新增Scheme Url</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>这个项目的名字:</Text>
        <TextInput
          style={styles.input}
          value={projectName}
          onChangeText={setProjectName}
          placeholder="请输入项目名称"
        />
        
        <Text style={styles.label}>您的Scheme Url：</Text>
        <TextInput
          style={styles.input}
          value={schemeUrl}
          onChangeText={setSchemeUrl}
          placeholder="请输入Scheme Url"
        />
        
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>确定</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 40,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSchemeScreen;