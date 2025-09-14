/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import React, { useState } from 'react';
import NavigationBar from './src/NavigationBar';
import HomeScreen from './src/HomeScreen';
import SettingsScreen from './src/SettingsScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      {activeTab === 'home' ? (
        <HomeScreen />
      ) : (
        <SettingsScreen />
      )}
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;