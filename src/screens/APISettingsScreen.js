import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  RadioButton,
  Switch,
  Divider,
  ActivityIndicator
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIService from '../services/AIService';

const APISettingsScreen = ({ navigation }) => {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('openai');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    loadCurrentSettings();
  }, []);

  const loadCurrentSettings = async () => {
    setIsLoading(true);
    try {
      const hasKey = await AIService.loadAPIKey();
      if (hasKey) {
        setProvider(AIService.provider);
        setApiKey(AIService.apiKey);
        setIsKeyValid(true);
      }
    } catch (error) {
      console.error('خطأ في تحميل الإعدادات:', error);
    }
    setIsLoading(false);
  };

  const validateAndSaveKey = async () => {
    if (!apiKey.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال مفتاح API');
      return;
    }

    setIsValidating(true);
    try {
      // حفظ المفتاح مؤقتاً للتحقق
      await AIService.setAPIKey(apiKey.trim(), provider);
      
      // التحقق من صحة المفتاح
      const isValid = await AIService.validateAPIKey();
      
      if (isValid) {
        setIsKeyValid(true);
        Alert.alert(
          'نجح!',
          'تم حفظ مفتاح API بنجاح وهو صالح للاستخدام',
          [
            {
              text: 'موافق',
              onPress: () => navigation.goBack()
            }
          ]
        );
      } else {
        setIsKeyValid(false);
        Alert.alert('خطأ', 'مفتاح API غير صحيح أو منتهي الصلاحية');
      }
    } catch (error) {
      setIsKeyValid(false);
      Alert.alert('خطأ', error.message || 'فشل في التحقق من مفتاح API');
    }
    setIsValidating(false);
  };

  const clearAPIKey = () => {
    Alert.alert(
      'تأكيد',
      'هل أنت متأكد من حذف مفتاح API؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: async () => {
            await AIService.clearAPIKey();
            setApiKey('');
            setIsKeyValid(null);
            Alert.alert('تم', 'تم حذف مفتاح API');
          }
        }
      ]
    );
  };

  const testConnection = async () => {
    if (!apiKey.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال مفتاح API أولاً');
      return;
    }

    setIsValidating(true);
    try {
      await AIService.setAPIKey(apiKey.trim(), provider);
      const response = await AIService.sendMessage('مرحبا، هذه رسالة اختبار');
      Alert.alert('نجح الاختبار!', `الرد: ${response.substring(0, 100)}...`);
    } catch (error) {
      Alert.alert('فشل الاختبار', error.message);
    }
    setIsValidating(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>جاري تحميل الإعدادات...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Icon name="api" size={40} color="#2196F3" />
            <Text style={styles.title}>إعدادات API الذكاء الاصطناعي</Text>
            <Text style={styles.subtitle}>
              قم بإعداد مفتاح API للاستفادة من خدمات الذكاء الاصطناعي
            </Text>
          </View>

          {/* Provider Selection */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>اختر مقدم الخدمة</Text>
              <RadioButton.Group
                onValueChange={setProvider}
                value={provider}
              >
                <View style={styles.radioItem}>
                  <RadioButton value="openai" />
                  <View style={styles.radioContent}>
                    <Text style={styles.radioTitle}>OpenAI (ChatGPT)</Text>
                    <Text style={styles.radioSubtitle}>
                      GPT-3.5, GPT-4, تحليل الصور
                    </Text>
                  </View>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value="google" />
                  <View style={styles.radioContent}>
                    <Text style={styles.radioTitle}>Google AI (Gemini)</Text>
                    <Text style={styles.radioSubtitle}>
                      Gemini Pro, مجاني مع حدود
                    </Text>
                  </View>
                </View>
              </RadioButton.Group>
            </Card.Content>
          </Card>

          {/* API Key Input */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>مفتاح API</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label={`مفتاح ${provider === 'openai' ? 'OpenAI' : 'Google'} API`}
                  value={apiKey}
                  onChangeText={setApiKey}
                  secureTextEntry={!showKey}
                  right={
                    <TextInput.Icon
                      icon={showKey ? 'eye-off' : 'eye'}
                      onPress={() => setShowKey(!showKey)}
                    />
                  }
                  style={styles.textInput}
                />
                {isKeyValid !== null && (
                  <View style={styles.validationContainer}>
                    <Icon
                      name={isKeyValid ? 'check-circle' : 'alert-circle'}
                      size={20}
                      color={isKeyValid ? '#4CAF50' : '#F44336'}
                    />
                    <Text
                      style={[
                        styles.validationText,
                        { color: isKeyValid ? '#4CAF50' : '#F44336' }
                      ]}
                    >
                      {isKeyValid ? 'مفتاح API صحيح' : 'مفتاح API غير صحيح'}
                    </Text>
                  </View>
                )}
              </View>
            </Card.Content>
          </Card>

          {/* Instructions */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>كيفية الحصول على مفتاح API</Text>
              {provider === 'openai' ? (
                <View>
                  <Text style={styles.instructionText}>
                    1. اذهب إلى platform.openai.com
                  </Text>
                  <Text style={styles.instructionText}>
                    2. سجل دخولك أو أنشئ حساب جديد
                  </Text>
                  <Text style={styles.instructionText}>
                    3. اذهب إلى API Keys في الإعدادات
                  </Text>
                  <Text style={styles.instructionText}>
                    4. انقر على "Create new secret key"
                  </Text>
                  <Text style={styles.instructionText}>
                    5. انسخ المفتاح والصقه هنا
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.instructionText}>
                    1. اذهب إلى makersuite.google.com
                  </Text>
                  <Text style={styles.instructionText}>
                    2. سجل دخولك بحساب Google
                  </Text>
                  <Text style={styles.instructionText}>
                    3. انقر على "Get API Key"
                  </Text>
                  <Text style={styles.instructionText}>
                    4. انسخ المفتاح والصقه هنا
                  </Text>
                </View>
              )}
            </Card.Content>
          </Card>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={validateAndSaveKey}
              loading={isValidating}
              disabled={isValidating || !apiKey.trim()}
              style={styles.primaryButton}
            >
              {isValidating ? 'جاري التحقق...' : 'حفظ والتحقق'}
            </Button>

            <Button
              mode="outlined"
              onPress={testConnection}
              disabled={isValidating || !apiKey.trim()}
              style={styles.secondaryButton}
            >
              اختبار الاتصال
            </Button>

            {apiKey && (
              <Button
                mode="text"
                onPress={clearAPIKey}
                textColor="#F44336"
                style={styles.dangerButton}
              >
                حذف مفتاح API
              </Button>
            )}
          </View>

          {/* Security Notice */}
          <Card style={[styles.card, styles.securityCard]}>
            <Card.Content>
              <View style={styles.securityHeader}>
                <Icon name="shield-check" size={24} color="#FF9800" />
                <Text style={styles.securityTitle}>ملاحظة أمنية</Text>
              </View>
              <Text style={styles.securityText}>
                • مفتاح API يُحفظ محلياً على جهازك فقط
              </Text>
              <Text style={styles.securityText}>
                • لا يتم إرسال المفتاح لأي خادم خارجي
              </Text>
              <Text style={styles.securityText}>
                • تأكد من عدم مشاركة مفتاحك مع أحد
              </Text>
              <Text style={styles.securityText}>
                • يمكنك حذف المفتاح في أي وقت
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioContent: {
    marginLeft: 12,
    flex: 1,
  },
  radioTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  radioSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  inputContainer: {
    marginBottom: 8,
  },
  textInput: {
    marginBottom: 8,
  },
  validationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  validationText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    marginVertical: 16,
  },
  primaryButton: {
    marginBottom: 12,
    paddingVertical: 4,
  },
  secondaryButton: {
    marginBottom: 12,
    paddingVertical: 4,
  },
  dangerButton: {
    marginTop: 8,
  },
  securityCard: {
    backgroundColor: '#FFF3E0',
    marginBottom: 32,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#FF9800',
  },
  securityText: {
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default APISettingsScreen;