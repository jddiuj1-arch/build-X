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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DataControlsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    dataCollection: true,
    analytics: false,
    crashReports: true,
    personalizedAds: false,
    locationData: false,
    voiceData: true,
    chatHistory: true,
    autoBackup: true,
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const dataControls = [
    {
      title: 'جمع البيانات',
      items: [
        {
          key: 'dataCollection',
          title: 'جمع بيانات الاستخدام',
          description: 'السماح بجمع بيانات مجهولة لتحسين التطبيق',
          icon: 'analytics-outline',
          critical: false,
        },
        {
          key: 'analytics',
          title: 'التحليلات المتقدمة',
          description: 'تحليل مفصل لسلوك الاستخدام',
          icon: 'bar-chart-outline',
          critical: false,
        },
        {
          key: 'crashReports',
          title: 'تقارير الأعطال',
          description: 'إرسال تقارير تلقائية عند حدوث أعطال',
          icon: 'bug-outline',
          critical: false,
        },
      ]
    },
    {
      title: 'الخصوصية',
      items: [
        {
          key: 'personalizedAds',
          title: 'الإعلانات المخصصة',
          description: 'عرض إعلانات مخصصة بناءً على اهتماماتك',
          icon: 'megaphone-outline',
          critical: false,
        },
        {
          key: 'locationData',
          title: 'بيانات الموقع',
          description: 'استخدام موقعك لتحسين الخدمة',
          icon: 'location-outline',
          critical: true,
        },
        {
          key: 'voiceData',
          title: 'البيانات الصوتية',
          description: 'حفظ التسجيلات الصوتية لتحسين التعرف على الصوت',
          icon: 'mic-outline',
          critical: true,
        },
      ]
    },
    {
      title: 'تخزين البيانات',
      items: [
        {
          key: 'chatHistory',
          title: 'تاريخ المحادثات',
          description: 'حفظ محادثاتك محلياً وفي السحابة',
          icon: 'chatbubbles-outline',
          critical: false,
        },
        {
          key: 'autoBackup',
          title: 'النسخ الاحتياطي التلقائي',
          description: 'نسخ احتياطي تلقائي لبياناتك في السحابة',
          icon: 'cloud-upload-outline',
          critical: false,
        },
      ]
    },
  ];

  const handleCriticalToggle = (key, title) => {
    if (settings[key]) {
      Alert.alert(
        'تحذير',
        `إيقاف "${title}" قد يؤثر على وظائف التطبيق. هل تريد المتابعة؟`,
        [
          { text: 'إلغاء', style: 'cancel' },
          {
            text: 'إيقاف',
            style: 'destructive',
            onPress: () => toggleSetting(key)
          }
        ]
      );
    } else {
      toggleSetting(key);
    }
  };

  const exportData = () => {
    setShowExportModal(false);
    Alert.alert(
      'تصدير البيانات',
      'سيتم إرسال رابط تحميل البيانات إلى بريدك الإلكتروني خلال 24 ساعة.',
      [{ text: 'موافق' }]
    );
  };

  const deleteAllData = () => {
    setShowDeleteModal(false);
    Alert.alert(
      'تأكيد الحذف',
      'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك نهائياً.',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'حذف نهائي',
          style: 'destructive',
          onPress: () => {
            Alert.alert('تم الحذف', 'تم حذف جميع بياناتك بنجاح');
          }
        }
      ]
    );
  };

  const renderDataControl = (item) => (
    <View key={item.key} style={styles.controlItem}>
      <View style={styles.controlLeft}>
        <View style={[
          styles.iconContainer,
          item.critical && { backgroundColor: '#ffebee' }
        ]}>
          <Ionicons 
            name={item.icon} 
            size={20} 
            color={item.critical ? '#f44336' : '#ff6b35'} 
          />
        </View>
        <View style={styles.controlText}>
          <View style={styles.titleRow}>
            <Text style={styles.controlTitle}>{item.title}</Text>
            {item.critical && (
              <View style={styles.criticalBadge}>
                <Text style={styles.criticalText}>حساس</Text>
              </View>
            )}
          </View>
          <Text style={styles.controlDescription}>{item.description}</Text>
        </View>
      </View>
      <Switch
        value={settings[item.key]}
        onValueChange={() => 
          item.critical 
            ? handleCriticalToggle(item.key, item.title)
            : toggleSetting(item.key)
        }
        trackColor={{ false: '#ccc', true: '#ff6b35' }}
        thumbColor={settings[item.key] ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

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
        <Text style={styles.headerTitle}>ضوابط البيانات</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Privacy Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="shield-checkmark" size={24} color="#4caf50" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>خصوصيتك مهمة</Text>
            <Text style={styles.infoDescription}>
              تحكم في كيفية جمع واستخدام بياناتك. يمكنك تغيير هذه الإعدادات في أي وقت.
            </Text>
          </View>
        </View>

        {/* Data Controls */}
        {dataControls.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContainer}>
              {section.items.map(renderDataControl)}
            </View>
          </View>
        ))}

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إدارة البيانات</Text>
          <View style={styles.sectionContainer}>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => setShowExportModal(true)}
            >
              <View style={styles.actionLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="download-outline" size={20} color="#2196f3" />
                </View>
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>تصدير البيانات</Text>
                  <Text style={styles.actionDescription}>
                    احصل على نسخة من جميع بياناتك
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-back" size={16} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => setShowDeleteModal(true)}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#ffebee' }]}>
                  <Ionicons name="trash-outline" size={20} color="#f44336" />
                </View>
                <View style={styles.actionText}>
                  <Text style={[styles.actionTitle, { color: '#f44336' }]}>
                    حذف جميع البيانات
                  </Text>
                  <Text style={styles.actionDescription}>
                    حذف نهائي لجميع بياناتك
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-back" size={16} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Export Modal */}
      <Modal
        visible={showExportModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>تصدير البيانات</Text>
              <TouchableOpacity onPress={() => setShowExportModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                سيتم تجميع جميع بياناتك في ملف مضغوط وإرسال رابط التحميل إلى بريدك الإلكتروني.
              </Text>
              <Text style={styles.modalNote}>
                قد تستغرق هذه العملية حتى 24 ساعة حسب كمية البيانات.
              </Text>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowExportModal(false)}
              >
                <Text style={styles.modalButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.primaryButton]}
                onPress={exportData}
              >
                <Text style={[styles.modalButtonText, styles.primaryButtonText]}>
                  تصدير
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>حذف جميع البيانات</Text>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.warningIcon}>
                <Ionicons name="warning" size={48} color="#f44336" />
              </View>
              <Text style={styles.warningText}>
                هذا الإجراء لا يمكن التراجع عنه!
              </Text>
              <Text style={styles.modalDescription}>
                سيتم حذف جميع محادثاتك، إعداداتك، وبياناتك الشخصية نهائياً من خوادمنا.
              </Text>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.dangerButton]}
                onPress={deleteAllData}
              >
                <Text style={[styles.modalButtonText, styles.dangerButtonText]}>
                  حذف نهائي
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerRight: {
    width: 40,
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
    backgroundColor: '#e8f5e8',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 12,
    marginHorizontal: 20,
    textAlign: 'right',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  controlItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  controlLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  controlText: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c2c2c',
    textAlign: 'right',
    flex: 1,
  },
  criticalBadge: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  criticalText: {
    fontSize: 10,
    color: '#f44336',
    fontWeight: 'bold',
  },
  controlDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    lineHeight: 18,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c2c2c',
    textAlign: 'right',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  bottomSpacing: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    maxWidth: 400,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
  modalContent: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    textAlign: 'right',
    marginBottom: 12,
  },
  modalNote: {
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  warningIcon: {
    alignItems: 'center',
    marginBottom: 16,
  },
  warningText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#ff6b35',
  },
  primaryButtonText: {
    color: '#fff',
  },
  dangerButton: {
    backgroundColor: '#f44336',
  },
  dangerButtonText: {
    color: '#fff',
  },
});

export default DataControlsScreen;