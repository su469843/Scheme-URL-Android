import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LogScreenProps = NativeStackScreenProps<RootStackParamList, 'Logs'>;

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error';
}

const LOG_STORAGE_KEY = '@app_logs';

const LogScreen: React.FC<LogScreenProps> = ({ navigation }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const storedLogs = await AsyncStorage.getItem(LOG_STORAGE_KEY);
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  };

  const clearLogs = async () => {
    Alert.alert(
      '清除日志',
      '确定要清除所有日志吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(LOG_STORAGE_KEY);
              setLogs([]);
            } catch (error) {
              console.error('Failed to clear logs:', error);
              Alert.alert('错误', '清除日志失败');
            }
          },
        },
      ]
    );
  };

  const goBackToHome = () => {
    navigation.navigate('Home');
  };

  const getLogStyle = (type: string) => {
    switch (type) {
      case 'error':
        return styles.errorLog;
      case 'warning':
        return styles.warningLog;
      default:
        return styles.infoLog;
    }
  };

  const renderLogItem = ({ item }: { item: LogEntry }) => (
    <View style={[styles.logItem, getLogStyle(item.type)]}>
      <Text style={styles.logTimestamp}>{item.timestamp}</Text>
      <Text style={styles.logMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>应用日志</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goBackToHome}>
            <Text style={styles.buttonText}>返回首页</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearLogs}>
            <Text style={styles.buttonText}>清除日志</Text>
          </TouchableOpacity>
        </View>

        {logs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>暂无日志记录</Text>
          </View>
        ) : (
          <FlatList
            data={logs}
            keyExtractor={(item) => item.id}
            renderItem={renderLogItem}
            style={styles.logList}
          />
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
  content: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: '#ff3b30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  logList: {
    flex: 1,
  },
  logItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  infoLog: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  warningLog: {
    borderLeftWidth: 4,
    borderLeftColor: '#ffcc00',
  },
  errorLog: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff3b30',
  },
  logTimestamp: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  logMessage: {
    fontSize: 14,
    color: '#333',
  },
});

export default LogScreen;