import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export type LogLevel = 'info' | 'warning' | 'error';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  level: LogLevel;
}

const LOG_STORAGE_KEY = '@app_logs';
const MAX_LOGS = 100; // 限制日志数量以避免占用过多存储空间

/**
 * 记录日志
 * @param message 日志消息
 * @param level 日志级别
 */
export const log = async (message: string, level: LogLevel = 'info'): Promise<void> => {
  try {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      id: uuidv4(),
      timestamp,
      message,
      level,
    };

    // 获取现有日志
    const existingLogs = await getLogs();
    
    // 添加新日志到开头
    const updatedLogs = [logEntry, ...existingLogs];
    
    // 限制日志数量
    const limitedLogs = updatedLogs.slice(0, MAX_LOGS);
    
    // 保存日志
    await AsyncStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(limitedLogs));
  } catch (error) {
    console.error('Failed to save log:', error);
  }
};

/**
 * 获取所有日志
 * @returns 日志条目数组
 */
export const getLogs = async (): Promise<LogEntry[]> => {
  try {
    const storedLogs = await AsyncStorage.getItem(LOG_STORAGE_KEY);
    if (storedLogs) {
      return JSON.parse(storedLogs);
    }
    return [];
  } catch (error) {
    console.error('Failed to load logs:', error);
    return [];
  }
};

/**
 * 清除所有日志
 */
export const clearLogs = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LOG_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear logs:', error);
    throw error;
  }
};

/**
 * 记录信息日志
 * @param message 日志消息
 */
export const logInfo = (message: string): Promise<void> => {
  return log(message, 'info');
};

/**
 * 记录警告日志
 * @param message 日志消息
 */
export const logWarning = (message: string): Promise<void> => {
  return log(message, 'warning');
};

/**
 * 记录错误日志
 * @param message 日志消息
 */
export const logError = (message: string): Promise<void> => {
  return log(message, 'error');
};

export default {
  log,
  getLogs,
  clearLogs,
  logInfo,
  logWarning,
  logError,
};