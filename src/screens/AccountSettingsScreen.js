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
    setEditField(field);
    setEditValue(currentValue);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    setUserInfo(prev => ({
      ...prev,
      [editField]: editValue
    }));
    setShowEditModal(false);
    Alert.alert('تم', 'تم حفظ التغييرات بنجاح');
  };

  const changePassword = () => {
    Alert.alert(
      'تغيير كلمة المرور',
      'سيتم إرسال رابط تغيير كلمة المرور إلى بريدك الإلكتروني',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'إرسال',
          onPress: () => Alert.alert('تم', 'تم إرسال رابط تغيير كلمة المرور')
        }
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      'حذف الحساب',
      'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك نهائياً.',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'حذف الحساب',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'تأكيد الحذف',
              'اكتب "حذف" للتأكيد',
              [
                { text: 'إلغاء', style: 'cancel' },
                {
                  text: 'تأكيد',
                  style: 'destructive',
                  onPress: () => {
                    Alert.alert('تم الحذف', 'تم حذف حسابك بنجاح');
                    navigation.navigate('Login');
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
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.settingItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={20} color="#ff6b35" />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingValue}>{item.value}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-back" size={16} color="#ccc" />
                </TouchableOpacity>
              ))}
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
            >
              <View style={styles.dangerLeft}>
                <View style={styles.dangerIcon}>
                  <Ionicons name="trash-outline" size={20} color="#f44336" />
                </View>
                <View style={styles.dangerText}>
                  <Text style={styles.dangerItemTitle}>حذف الحساب</Text>
                  <Text style={styles.dangerItemDesc}>حذف نهائي لجميع البيانات</Text>
                </View>
              </View>
              <Ionicons name="chevron-back" size={16} color="#f44336" />
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
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
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#2c2c2c',
    fontWeight: '500',
    textAlign: 'right',
    marginBottom: 2,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 12,
    marginHorizontal: 20,
    textAlign: 'right',
  },
  dangerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffebee',
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dangerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dangerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dangerText: {
    flex: 1,
  },
  dangerItemTitle: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: '500',
    textAlign: 'right',
    marginBottom: 2,
  },
  dangerItemDesc: {
    fontSize: 14,
    color: '#f44336',
    opacity: 0.7,
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