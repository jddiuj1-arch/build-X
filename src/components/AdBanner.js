import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AdBanner = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [showAd, setShowAd] = useState(true);

  // Sample ads - يمكن استبدالها بإعلانات حقيقية من API
  const ads = [
    {
      id: 1,
      title: 'احصل على Manus Pro',
      description: 'استمتع بميزات متقدمة وإجابات أسرع',
      buttonText: 'ترقية الآن',
      color: '#4CAF50',
      icon: 'star',
    },
    {
      id: 2,
      title: 'دعوة الأصدقاء',
      description: 'احصل على نقاط مجانية عند دعوة أصدقائك',
      buttonText: 'دعوة',
      color: '#2196F3',
      icon: 'people',
    },
    {
      id: 3,
      title: 'ميزة جديدة!',
      description: 'جرب مساعد الكود الجديد للبرمجة',
      buttonText: 'جرب الآن',
      color: '#FF9800',
      icon: 'code-slash',
    },
  ];

  useEffect(() => {
    // تغيير الإعلان كل 10 ثوانٍ
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAdClick = () => {
    const ad = ads[currentAd];
    Alert.alert(ad.title, `سيتم تنفيذ: ${ad.buttonText}`);
  };

  const handleCloseAd = () => {
    setShowAd(false);
  };

  if (!showAd) {
    return null;
  }

  const ad = ads[currentAd];

  return (
    <View style={[styles.container, { backgroundColor: ad.color }]}>
      <TouchableOpacity style={styles.closeButton} onPress={handleCloseAd}>
        <Ionicons name="close" size={16} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={ad.icon} size={24} color="#fff" />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{ad.title}</Text>
          <Text style={styles.description}>{ad.description}</Text>
        </View>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleAdClick}>
          <Text style={styles.buttonText}>{ad.buttonText}</Text>
        </TouchableOpacity>
      </View>
      
      {/* Ad indicators */}
      <View style={styles.indicators}>
        {ads.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentAd && styles.activeIndicator
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
    textAlign: 'right',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 12,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
});

export default AdBanner;