import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  TextInput,
  Modal,
  Animated,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountSettingsScreen = ({ navigation, route }) => {
  const { userType, email, name, userPoints } = route.params || {};
  
  const [userInfo, setUserInfo] = useState({
    name: name || '',
    email: email || '',
    phone: '',
    bio: '',
  });
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleEditField = (field, currentValue) => {
    Vibration.vibrate(10);
    setEditField(field);
    setEditValue(currentValue);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    Vibration.vibrate(15);
    setUserInfo(prev => ({
      ...prev,
      [editField]: editValue
    }));
    setShowEditModal(false);
    Alert.alert('تم ✅', 'تم حفظ التغييرات بنجاح');
  };

  const changePassword = () => {
    Vibration.vibrate(10);
    Alert.alert(
      '🔐 تغيير كلمة المرور',
      'سيتم إرسال رابط تغيير كلمة المرور إلى بريدك الإلكتروني',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'إرسال 📧',
          onPress: () => {
            Vibration.vibrate(20);
            Alert.alert('تم ✅', 'تم إرسال رابط تغيير كلمة المرور');
          }
        }
      ]
    );
  };

  const deleteAccount = () => {
    Vibration.vibrate([0, 100, 50, 100]); // اهتزاز تحذيري
    Alert.alert(
      '⚠️ حذف الحساب',
      'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك نهائياً.',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: '🗑️ حذف الحساب',
          style: 'destructive',
          onPress: () => {
            Vibration.vibrate([0, 150, 100, 150]);
            Alert.alert(
              '🚨 تأكيد الحذف',
              'هل أنت متأكد تماماً من حذف حسابك؟ لن تتمكن من استرداد بياناتك.',
              [
                { text: 'إلغاء', style: 'cancel' },
                {
                  text: '💀 حذف نهائي',
                  style: 'destructive',
                  onPress: () => {
                    Vibration.vibrate(200);
                    Alert.alert('تم الحذف 💔', 'تم حذف حسابك بنجاح. نأسف لرؤيتك تغادر!');
                    setTimeout(() => navigation.navigate('Login'), 2000);
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const accountSections = [
    {
      title: 'المعلومات الشخصية',
      items: [
        {
          icon: 'person-outline',
          title: 'الاسم',
          value: userInfo.name || 'غير محدد',
          onPress: () => handleEditField('name', userInfo.name),
        },
        {
          icon: 'mail-outline',
          title: 'البريد الإلكتروني',
          value: userInfo.email || 'غير محدد',
          onPress: () => handleEditField('email', userInfo.email),
        },
        {
          icon: 'call-outline',
          title: 'رقم الهاتف',
          value: userInfo.phone || 'غير محدد',
          onPress: () => handleEditField('phone', userInfo.phone),
        },
        {
          icon: 'document-text-outline',
          title: 'النبذة الشخصية',
          value: userInfo.bio || 'غير محدد',
          onPress: () => handleEditField('bio', userInfo.bio),
        },
      ]
    },
    {
      title: 'الأمان',
      items: [
        {
          icon: 'key-outline',
          title: 'تغيير كلمة المرور',
          value: '••••••••',
          onPress: changePassword,
        },
        {
          icon: 'shield-checkmark-outline',
          title: 'التحقق بخطوتين',
          value: 'معطل',
          onPress: () => Alert.alert('التحقق بخطوتين', 'سيتم إضافة هذه الميزة قريباً'),
        },
        {
          icon: 'finger-print-outline',
          title: 'البصمة/Face ID',
          value: 'معطل',
          onPress: () => Alert.alert('البصمة', 'سيتم إضافة هذه الميزة قريباً'),
        },
      ]
    },
    {
      title: 'الاشتراك والفوترة',
      items: [
        {
          icon: 'card-outline',
          title: 'خطة الاشتراك',
          value: 'Free Plan',
          onPress: () => navigation.navigate('Upgrade'),
        },
        {
          icon: 'receipt-outline',
          title: 'تاريخ الفواتير',
          value: 'عرض الفواتير',
          onPress: () => Alert.alert('الفواتير', 'لا توجد فواتير متاحة'),
        },
        {
          icon: 'star-outline',
          title: 'النقاط المكتسبة',
          value: `${userPoints || 0} نقطة`,
          onPress: () => Alert.alert('النقاط', `لديك ${userPoints || 0} نقطة متاحة`),
        },
      ]
    },
  ];

  const getFieldLabel = (field) => {
    switch (field) {
      case 'name': return 'الاسم';
      case 'email': return 'البريد الإلكتروني';
      case 'phone': return 'رقم الهاتف';
      case 'bio': return 'النبذة الشخصية';
      default: return '';
    }
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
        <Text style={styles.headerTitle}>إعدادات الحساب</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userType === 'guest' ? 'ض' : (userInfo.name ? userInfo.name.charAt(0) : userInfo.email?.charAt(0) || 'U')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {userType === 'guest' ? 'ضيف' : (userInfo.name || userInfo.email)}
            </Text>
            <Text style={styles.profileEmail}>{userInfo.email}</Text>
            <View style={styles.statusBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4caf50" />
              <Text style={styles.statusText}>حساب مفعل</Text>
            </View>
          </View>
        </View>

        {/* Account Sections */}
        {accountSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContainer}>
              {section.items.map((item, itemIndex) => {
                const [scaleValue] = useState(new Animated.Value(1));
                
                const handlePress = () => {
                  Vibration.vibrate(8);
                  
                  Animated.sequence([
                    Animated.timing(scaleValue, {
                      toValue: 0.97,
                      duration: 100,
                      useNativeDriver: true,
                    }),
                    Animated.timing(scaleValue, {
                      toValue: 1,
                      duration: 100,
                      useNativeDriver: true,
                    }),
                  ]).start();
                  
                  if (item.onPress) {
                    setTimeout(() => item.onPress(), 150);
                  }
                };

                return (
                  <Animated.View
                    key={itemIndex}
                    style={[
                      styles.settingItemContainer,
                      { transform: [{ scale: scaleValue }] }
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.settingItem}
                      onPress={handlePress}
                      activeOpacity={0.8}
                    >
                      <View style={styles.settingLeft}>
                        <View style={styles.iconContainer}>
                          <Ionicons name={item.icon} size={22} color="#ff6b35" />
                        </View>
                        <View style={styles.settingText}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingValue}>{item.value}</Text>
                        </View>
                      </View>
                      <Ionicons name="chevron-back" size={18} color="#ccc" />
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </View>
        ))}

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>منطقة الخطر</Text>
          <View style={styles.dangerContainer}>
            <TouchableOpacity
              style={styles.dangerItem}
              onPress={deleteAccount}
              activeOpacity={0.8}
            >
              <View style={styles.dangerLeft}>
                <View style={styles.dangerIcon}>
                  <Ionicons name="trash-outline" size={22} color="#f44336" />
                </View>
                <View style={styles.dangerText}>
                  <Text style={styles.dangerItemTitle}>🗑️ حذف الحساب</Text>
                  <Text style={styles.dangerItemDesc}>حذف نهائي لجميع البيانات - لا يمكن التراجع</Text>
                </View>
              </View>
              <Ionicons name="chevron-back" size={18} color="#f44336" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>تعديل {getFieldLabel(editField)}</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <TextInput
                style={[
                  styles.textInput,
                  editField === 'bio' && styles.textArea
                ]}
                placeholder={`أدخل ${getFieldLabel(editField)}`}
                value={editValue}
                onChangeText={setEditValue}
                textAlign="right"
                multiline={editField === 'bio'}
                numberOfLines={editField === 'bio' ? 4 : 1}
                keyboardType={editField === 'email' ? 'email-address' : editField === 'phone' ? 'phone-pad' : 'default'}
                autoFocus
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.primaryButton]}
                onPress={saveEdit}
              >
                <Text style={[styles.modalButtonText, styles.primaryButtonText]}>
                  حفظ
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
  profileCard: {
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
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
    textAlign: 'right',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'right',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    color: '#4caf50',
    marginLeft: 4,
    fontWeight: '500',
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
  settingItemContainer: {
    marginHorizontal: 2,
    marginVertical: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 17,
    color: '#2c2c2c',
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  dangerZone: {
    marginBottom: 24,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 16,
    marginHorizontal: 20,
    textAlign: 'right',
    letterSpacing: 0.3,
  },
  dangerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffcdd2',
    shadowColor: '#f44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff8f8',
    borderRadius: 14,
  },
  dangerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dangerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#f44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  dangerText: {
    flex: 1,
  },
  dangerItemTitle: {
    fontSize: 17,
    color: '#f44336',
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  dangerItemDesc: {
    fontSize: 14,
    color: '#f44336',
    opacity: 0.8,
    textAlign: 'right',
    fontWeight: '500',
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
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
});

export default AccountSettingsScreen;