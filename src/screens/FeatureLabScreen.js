import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  StatusBar,
  Animated,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeatureLabScreen = ({ navigation }) => {
  const [features, setFeatures] = useState({
    voiceMode: false,
    smartSuggestions: true,
    autoTranslate: false,
    advancedSearch: true,
    betaUI: false,
    experimentalAI: false,
  });

  const toggleFeature = (featureKey) => {
    // تأثير الاهتزاز الخفيف
    Vibration.vibrate(15);
    
    setFeatures(prev => {
      const newValue = !prev[featureKey];
      
      // إظهار رسالة تأكيد للميزات المهمة
      if (featureKey === 'experimentalAI' && newValue) {
        Alert.alert(
          'تحذير',
          'هذه ميزة تجريبية قد تؤثر على أداء التطبيق. هل تريد المتابعة؟',
          [
            { text: 'إلغاء', style: 'cancel' },
            { text: 'تفعيل', onPress: () => {
              return {
                ...prev,
                [featureKey]: newValue
              };
            }}
          ]
        );
        return prev; // لا تغير الحالة حتى يؤكد المستخدم
      }
      
      return {
        ...prev,
        [featureKey]: newValue
      };
    });
  };

  const experimentalFeatures = [
    {
      key: 'voiceMode',
      title: 'الوضع الصوتي',
      description: 'تفاعل مع الذكي الاصطناعي بالصوت',
      icon: 'mic-outline',
      status: 'تجريبي',
      statusColor: '#ff9800',
    },
    {
      key: 'smartSuggestions',
      title: 'الاقتراحات الذكية',
      description: 'اقتراحات تلقائية أثناء الكتابة',
      icon: 'bulb-outline',
      status: 'مستقر',
      statusColor: '#4caf50',
    },
    {
      key: 'autoTranslate',
      title: 'الترجمة التلقائية',
      description: 'ترجمة الرسائل تلقائياً',
      icon: 'language-outline',
      status: 'تجريبي',
      statusColor: '#ff9800',
    },
    {
      key: 'advancedSearch',
      title: 'البحث المتقدم',
      description: 'بحث ذكي في المحادثات',
      icon: 'search-outline',
      status: 'بيتا',
      statusColor: '#2196f3',
    },
    {
      key: 'betaUI',
      title: 'واجهة بيتا',
      description: 'تجربة الواجهة الجديدة',
      icon: 'color-palette-outline',
      status: 'بيتا',
      statusColor: '#2196f3',
    },
    {
      key: 'experimentalAI',
      title: 'نماذج AI تجريبية',
      description: 'الوصول لأحدث نماذج الذكي الاصطناعي',
      icon: 'rocket-outline',
      status: 'تجريبي',
      statusColor: '#ff9800',
    },
  ];

  const handleFeatureToggle = (featureKey, featureTitle) => {
    if (!features[featureKey]) {
      Alert.alert(
        'تفعيل ميزة تجريبية',
        `هل تريد تفعيل "${featureTitle}"؟\n\nتنبيه: الميزات التجريبية قد تكون غير مستقرة.`,
        [
          { text: 'إلغاء', style: 'cancel' },
          {
            text: 'تفعيل',
            onPress: () => {
              toggleFeature(featureKey);
              Alert.alert('تم التفعيل', `تم تفعيل "${featureTitle}" بنجاح`);
            }
          }
        ]
      );
    } else {
      toggleFeature(featureKey);
    }
  };

  const resetAllFeatures = () => {
    Alert.alert(
      'إعادة تعيين الميزات',
      'هل تريد إعادة تعيين جميع الميزات التجريبية؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'إعادة تعيين',
          style: 'destructive',
          onPress: () => {
            setFeatures({
              voiceMode: false,
              smartSuggestions: true,
              autoTranslate: false,
              advancedSearch: true,
              betaUI: false,
              experimentalAI: false,
            });
            Alert.alert('تم', 'تم إعادة تعيين جميع الميزات');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-forward" size={24} color="#2c2c2c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>مختبر الميزات</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetAllFeatures}>
          <Ionicons name="refresh-outline" size={20} color="#ff6b35" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="flask" size={24} color="#ff6b35" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>مختبر الميزات التجريبية</Text>
            <Text style={styles.infoDescription}>
              جرب أحدث الميزات قبل إطلاقها رسمياً. قد تكون بعض الميزات غير مستقرة.
            </Text>
          </View>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>الميزات المتاحة</Text>
          
          {experimentalFeatures.map((feature, index) => {
            const [scaleValue] = useState(new Animated.Value(1));
            
            const handleFeaturePress = () => {
              Vibration.vibrate(10);
              
              Animated.sequence([
                Animated.timing(scaleValue, {
                  toValue: 0.98,
                  duration: 100,
                  useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                  toValue: 1,
                  duration: 100,
                  useNativeDriver: true,
                }),
              ]).start();
              
              handleFeatureToggle(feature.key, feature.title);
            };

            return (
              <Animated.View 
                key={feature.key} 
                style={[
                  styles.featureCard,
                  { transform: [{ scale: scaleValue }] }
                ]}
              >
                <TouchableOpacity 
                  style={styles.featureHeader}
                  onPress={handleFeaturePress}
                  activeOpacity={0.9}
                >
                  <View style={styles.featureInfo}>
                    <View style={[
                      styles.featureIconContainer,
                      features[feature.key] && styles.activeIconContainer
                    ]}>
                      <Ionicons 
                        name={feature.icon} 
                        size={24} 
                        color={features[feature.key] ? "#fff" : "#ff6b35"} 
                      />
                    </View>
                    <View style={styles.featureText}>
                      <View style={styles.featureTitleRow}>
                        <Text style={[
                          styles.featureTitle,
                          features[feature.key] && styles.activeFeatureTitle
                        ]}>
                          {feature.title}
                        </Text>
                        <View style={[
                          styles.statusBadge, 
                          { backgroundColor: feature.statusColor + '20' }
                        ]}>
                          <Text style={[styles.statusText, { color: feature.statusColor }]}>
                            {feature.status}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.featureDescription}>{feature.description}</Text>
                    </View>
                  </View>
                  <Switch
                    value={features[feature.key]}
                    onValueChange={handleFeaturePress}
                    trackColor={{ false: '#e0e0e0', true: '#ff6b35' }}
                    thumbColor={features[feature.key] ? '#fff' : '#f4f3f4'}
                    style={styles.featureSwitch}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Feedback Section */}
        <View style={styles.feedbackSection}>
          <Text style={styles.sectionTitle}>ملاحظاتك مهمة</Text>
          <View style={styles.feedbackCard}>
            <Ionicons name="chatbubble-outline" size={24} color="#4caf50" />
            <View style={styles.feedbackContent}>
              <Text style={styles.feedbackTitle}>شارك تجربتك</Text>
              <Text style={styles.feedbackDescription}>
                أخبرنا عن تجربتك مع الميزات التجريبية لمساعدتنا في التحسين
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.feedbackButton}
              onPress={() => Alert.alert('الملاحظات', 'سيتم إضافة نموذج الملاحظات قريباً')}
            >
              <Text style={styles.feedbackButtonText}>إرسال</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 50,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
  resetButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
    textAlign: 'right',
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'right',
  },
  featuresContainer: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 16,
    textAlign: 'right',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featureInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    transition: 'all 0.3s ease',
  },
  activeIconContainer: {
    backgroundColor: '#ff6b35',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  featureText: {
    flex: 1,
  },
  featureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c2c2c',
    textAlign: 'right',
    flex: 1,
    letterSpacing: 0.3,
  },
  activeFeatureTitle: {
    color: '#ff6b35',
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    lineHeight: 18,
  },
  featureSwitch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  feedbackSection: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  feedbackCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  feedbackContent: {
    flex: 1,
    marginHorizontal: 16,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
    textAlign: 'right',
  },
  feedbackDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    lineHeight: 18,
  },
  feedbackButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default FeatureLabScreen;