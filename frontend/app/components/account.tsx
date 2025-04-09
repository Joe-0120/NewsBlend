import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MyAccount() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { 
      paddingTop: insets.top, 
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }]}>
      {/* Custom header at the top, arrow + text on the same line */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/profile')}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My account</Text>
      </View>

      {/* Scrollable content area */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* White card with two rows*/}
        <View style={styles.card}>
          {/* Row: Email address */}
          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View>
              <Text style={styles.rowTitle}>Email address</Text>
              <Text style={styles.rowSubtitle}>j***doe@gmail.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>

     

          {/* Row: Privacy settings */}
          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View>
              <Text style={styles.rowTitle}>Privacy settings</Text>
              <Text style={styles.rowSubtitle}>Private account</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5', // light-gray background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  rowSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
    marginTop: 4,
  },
  
});

