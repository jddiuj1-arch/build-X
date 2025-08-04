import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Linking,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpSupportScreen = ({ navigation }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    email: '',
  });

  const faqData = [
    {
      question: 'كيف يمكنني تغيير إعدادات الذكي الاصطناعي؟',
      answer: 'يمكنك الوصول إلى إعدادات API من القائمة الجانبية، ثم تخصيص نموذج الذكي الاصطناعي والمعاملات حسب احتياجاتك.',
      category: 'الإعدادات'
    },
    {
      question: 'هل يمكنني استخدام التطبيق بدون إنترنت؟',
      answer: 'التطبيق يحتاج إلى اتصال بالإنترنت للتواصل مع خدمات الذكي الاصطناعي، لكن يمكنك عرض المحادثات المحفوظة بدون إنترنت.',
      category: 'الاستخدام'
    },
    {
      question: 'كيف يمكنني ترقية حسابي؟',
      answer: 'اذهب إلى الإعدادات > الاشتراك، واختر الخطة المناسبة لك. ستحصل على ميزات إضافية مثل المزيد من الرسائل والنماذج المتقدمة.',
      category: 'الاشتراك'
    },
    {
      question: 'هل بياناتي آمنة؟',
      answer: 'نعم، نحن نأخذ الخصوصية على محمل الجد. جميع المحادثات مشفرة ولا نشارك بياناتك مع أطراف ثالثة.',
      category: 'الخصوصية'
    },
    {
      question: 'كيف يمكنني حفظ المحادثات؟',
      answer: 'المحادثات تُحفظ تلقائياً في التطبيق. يمكنك أيضاً تصديرها من إعدادات البيانات أو مشاركتها مباشرة.',
      category: 'الاستخدام'
    },
    {
      question: 'ما هي النقاط وكيف أحصل عليها؟',
      answer: 'النقاط تُمنح عند استخدام التطبيق يومياً، دعوة الأصدقاء، وتقييم التطبيق. يمكن استخدامها للحصول على ميزات إضافية.',
      category: 'النقاط'
    },
  ];

  const supportOptions = [
    {
      icon: 'mail-outline',
      title: 'إرسال رسالة',
      description: 'تواصل معنا عبر البريد الإلكتروني',
      action: () => setShowContactModal(true),
    },
    {
      icon: 'logo-whatsapp',
      title: 'واتساب',
      description: 'دردشة مباشرة عبر واتساب',
      action: () => {
        Linking.openURL('https://wa.me/1234567890?text=مرحباً، أحتاج مساعدة في تطبيق Build X');
      },
    },
    {
      icon: 'call-outline',
      title: 'اتصال هاتفي',
      description: 'تحدث مع فريق الدعم',
      action: () => {
        Alert.alert(
          'الدعم الهاتفي',
          'أوقات العمل: الأحد - الخميس، 9 صباحاً - 6 مساءً\n\nرقم الهاتف: +966 50 123 4567',
          [
            { text: 'إلغاء', style: 'cancel' },
            { text: 'اتصال', onPress: () => Linking.openURL('tel:+966501234567') }
          ]
        );
      },
    },
    {
      icon: 'chatbubbles-outline',
      title: 'الدردشة المباشرة',
      description: 'دردشة فورية مع الدعم',
      action: () => {
        Alert.alert('الدردشة المباشرة', 'سيتم إضافة هذه الميزة قريباً');
      },
    },
  ];

  const quickLinks = [
    {
      icon: 'document-text-outline',
      title: 'شروط الاستخدام',
      action: () => Alert.alert('شروط الاستخدام', 'سيتم فتح شروط الاستخدام'),
    },
    {
      icon: 'shield-outline',
      title: 'سياسة الخصوصية',
      action: () => Alert.alert('سياسة الخصوصية', 'سيتم فتح سياسة الخصوصية'),
    },
    {
      icon: 'information-circle-outline',
      title: 'حول التطبيق',
      action: () => navigation.navigate('AboutApp'),
    },
    {
      icon: 'star-outline',
      title: 'قيم التطبيق',
      action: () => {
        Alert.alert(
          'تقييم التطبيق',
          'شكراً لك! هل تود تقييم التطبيق في المتجر؟',
          [
            { text: 'لاحقاً', style: 'cancel' },
            { text: 'تقييم', onPress: () => Alert.alert('شكراً!', 'سيتم توجيهك للمتجر') }
          ]
        );
      },
    },
  ];

  const sendContactForm = () => {
    if (!contactForm.subject || !contactForm.message || !contactForm.email) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }

    setShowContactModal(false);
    Alert.alert('تم الإرسال', 'تم إرسال رسالتك بنجاح. سنرد عليك خلال 24 ساعة.');
    setContactForm({ subject: '', message: '', email: '' });
  };

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
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
        <Text style={styles.headerTitle}>المساعدة والدعم</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Support Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>تواصل معنا</Text>
          <View style={styles.supportGrid}>
            {supportOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.supportCard}
                onPress={option.action}
                activeOpacity={0.7}
              >
                <View style={styles.supportIcon}>
                  <Ionicons name={option.icon} size={24} color="#ff6b35" />
                </View>
                <Text style={styles.supportTitle}>{option.title}</Text>
                <Text style={styles.supportDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الأسئلة الشائعة</Text>
          <View style={styles.faqContainer}>
            {faqData.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFaq(index)}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Ionicons 
                    name={expandedFaq === index ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
                {expandedFaq === index && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    <View style={styles.faqCategory}>
                      <Text style={styles.faqCategoryText}>{faq.category}</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>روابط مفيدة</Text>
          <View style={styles.linksContainer}>
            {quickLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkItem}
                onPress={link.action}
                activeOpacity={0.7}
              >
                <View style={styles.linkLeft}>
                  <View style={styles.linkIcon}>
                    <Ionicons name={link.icon} size={20} color="#ff6b35" />
                  </View>
                  <Text style={styles.linkTitle}>{link.title}</Text>
                </View>
                <Ionicons name="chevron-back" size={16} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoTitle}>Build X</Text>
          <Text style={styles.appInfoVersion}>الإصدار 1.0.0</Text>
          <Text style={styles.appInfoDescription}>
            مساعد الذكي الاصطناعي المتقدم لجميع احتياجاتك
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Contact Modal */}
      <Modal
        visible={showContactModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>إرسال رسالة</Text>
              <TouchableOpacity onPress={() => setShowContactModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>البريد الإلكتروني</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChangeText={(text) => setContactForm(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  textAlign="right"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>الموضوع</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="موضوع الرسالة"
                  value={contactForm.subject}
                  onChangeText={(text) => setContactForm(prev => ({ ...prev, subject: text }))}
                  textAlign="right"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>الرسالة</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="اكتب رسالتك هنا..."
                  value={contactForm.message}
                  onChangeText={(text) => setContactForm(prev => ({ ...prev, message: text }))}
                  multiline
                  numberOfLines={5}
                  textAlign="right"
                  textAlignVertical="top"
                />
              </View>
            </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowContactModal(false)}
              >
                <Text style={styles.modalButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.primaryButton]}
                onPress={sendContactForm}
              >
                <Text style={[styles.modalButtonText, styles.primaryButtonText]}>
                  إرسال
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 16,
    marginHorizontal: 20,
    textAlign: 'right',
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  supportCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  supportIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
    textAlign: 'center',
  },
  supportDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  faqContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  faqItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    color: '#2c2c2c',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'right',
    marginBottom: 8,
  },
  faqCategory: {
    alignSelf: 'flex-end',
  },
  faqCategoryText: {
    fontSize: 12,
    color: '#ff6b35',
    backgroundColor: '#fff5f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  linksContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  linkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkTitle: {
    fontSize: 16,
    color: '#2c2c2c',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  appInfo: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  appInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 4,
  },
  appInfoVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  appInfoDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
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
    maxHeight: '80%',
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
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c2c2c',
    marginBottom: 8,
    textAlign: 'right',
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

export default HelpSupportScreen;