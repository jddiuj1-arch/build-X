import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from './ChatScreen';
import SideMenu from '../components/SideMenu';
import AdBanner from '../components/AdBanner';

const { width, height } = Dimensions.get('window');

const MainScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('الكل');
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [userPoints, setUserPoints] = useState(293);
  
  const { userType, email, name } = route.params || {};

  const tabs = ['الكل', 'المفضلة', 'مجدول'];

  const handleNewChat = () => {
    navigation.navigate('Chat', { userType, email, name, userPoints });
  };

  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSideMenu}>
          <Ionicons name="person-circle-outline" size={32} color="#2c2c2c" />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#2c2c2c" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
        
        <Text style={styles.logo}>Build X</Text>
        
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#2c2c2c" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ad Banner */}
        <AdBanner />
        
        {/* Points Display */}
        <View style={styles.pointsContainer}>
          <View style={styles.pointsCard}>
            <View style={styles.pointsInfo}>
              <Text style={styles.pointsLabel}>رصيد</Text>
              <View style={styles.pointsRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.pointsValue}>{userPoints}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeText}>ترقية</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Chat Card */}
        <View style={styles.chatCard}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTime}>PM 1:55</Text>
            <View style={styles.chatBadge}>
              <Text style={styles.chatBadgeText}>2</Text>
            </View>
          </View>
          <Text style={styles.chatTitle}>كيفية استخدام أداة بناء APK</Text>
          <Text style={styles.chatPreview}>
            لقد وجدت أن GitHub Actions هي خدمة CI/CD ممتازة لبناء ملفا...
          </Text>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>كيف يمكنني مساعدتك؟</Text>
        </View>
      </ScrollView>

      {/* New Chat Button */}
      <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Side Menu Modal */}
      <Modal
        visible={showSideMenu}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSideMenu(false)}
      >
        <SideMenu
          userType={userType}
          email={email}
          name={name}
          userPoints={userPoints}
          onClose={() => setShowSideMenu(false)}
          navigation={navigation}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#2c2c2c',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pointsContainer: {
    marginVertical: 20,
  },
  pointsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pointsInfo: {
    flex: 1,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginLeft: 4,
  },
  upgradeButton: {
    backgroundColor: '#2c2c2c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chatCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chatTime: {
    fontSize: 12,
    color: '#666',
  },
  chatBadge: {
    backgroundColor: '#ff4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
    textAlign: 'right',
  },
  chatPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'right',
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  welcomeTitle: {
    fontSize: 20,
    color: '#2c2c2c',
    textAlign: 'center',
  },
  newChatButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#2c2c2c',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default MainScreen;