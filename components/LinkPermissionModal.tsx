// components/LinkPermissionModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Switch, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'hasShownLinkPermissionModal';

export default function LinkPermissionModal() {
  const [visible, setVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const checkModalShown = async () => {
      const hasShown = await AsyncStorage.getItem(STORAGE_KEY);
      if (!hasShown) setVisible(true);
    };
    checkModalShown();
  }, []);

  const handleClose = async () => {
    if (dontShowAgain) {
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
    }
    setVisible(false);
  };

  if (!visible || Platform.OS !== 'android') return null;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Open Links in App</Text>
          <Text style={styles.body}>
            To ensure password reset links open inside the app instead of the browser, follow these steps:
            {"\n\n"}1. Go to your phone Settings {"\n"}2. Find the app: Service Vale
            {"\n"}3. Tap “Set as default”{"\n"}4. Enable “Open supported links”
          </Text>

          <View style={styles.row}>
            <Switch value={dontShowAgain} onValueChange={setDontShowAgain} />
            <Text style={styles.checkboxLabel}>Don't show again</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    marginBottom: 20,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
