import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CloudBrowserScreen = ({ navigation }) => {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [storageUsed, setStorageUsed] = useState(2.3);
  const [storageTotal] = useState(5.0);

  useEffect(() => {
    loadFiles();
  }, [currentPath]);

  const loadFiles = () => {
    // محاكاة تحميل الملفات
    const mockFiles = [
      {
        id: '1',
        name: 'المحادثات المحفوظة',
        type: 'folder',
        size: null,
        modified: '2024-08-01',
        icon: 'folder-outline',
      },
      {
        id: '2',
        name: 'الصور المرفوعة',
        type: 'folder',
        size: null,
        modified: '2024-08-02',
        icon: 'folder-outline',
      },
      {
        id: '3',
        name: 'محادثة مع AI - 2024-08-04.txt',
        type: 'file',
        size: '2.5 KB',
        modified: '2024-08-04',
        icon: 'document-text-outline',
      },
      {
        id: '4',
        name: 'تقرير شهري.pdf',
        type: 'file',
        size: '1.2 MB',
        modified: '2024-08-03',
        icon: 'document-outline',
      },
      {
        id: '5',
        name: 'صورة_شاشة.png',
        type: 'file',
        size: '856 KB',
        modified: '2024-08-04',
        icon: 'image-outline',
      },
    ];
    setFiles(mockFiles);
  };

  const navigateToFolder = (folderName) => {
    setCurrentPath(currentPath + folderName + '/');
    setSelectedFiles([]);
  };

  const navigateBack = () => {
    if (currentPath !== '/') {
      const pathParts = currentPath.split('/').filter(part => part);
      pathParts.pop();
      setCurrentPath('/' + pathParts.join('/') + (pathParts.length > 0 ? '/' : ''));
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const createFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        type: 'folder',
        size: null,
        modified: new Date().toISOString().split('T')[0],
        icon: 'folder-outline',
      };
      setFiles(prev => [...prev, newFolder]);
      setNewFolderName('');
      setShowCreateModal(false);
      Alert.alert('تم', `تم إنشاء المجلد "${newFolderName}" بنجاح`);
    }
  };

  const deleteSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      Alert.alert('تنبيه', 'يرجى اختيار ملفات للحذف');
      return;
    }

    Alert.alert(
      'حذف الملفات',
      `هل تريد حذف ${selectedFiles.length} ملف؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => {
            setFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
            setSelectedFiles([]);
            Alert.alert('تم', 'تم حذف الملفات المحددة');
          }
        }
      ]
    );
  };

  const shareFiles = () => {
    if (selectedFiles.length === 0) {
      Alert.alert('تنبيه', 'يرجى اختيار ملفات للمشاركة');
      return;
    }
    Alert.alert('مشاركة', `سيتم مشاركة ${selectedFiles.length} ملف`);
  };

  const uploadFile = () => {
    setShowUploadModal(false);
    Alert.alert('رفع الملفات', 'سيتم إضافة خاصية رفع الملفات قريباً');
  };

  const getFileIcon = (file) => {
    if (file.type === 'folder') return 'folder-outline';
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'document-outline';
      case 'txt': case 'doc': case 'docx': return 'document-text-outline';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return 'image-outline';
      case 'mp4': case 'avi': case 'mov': return 'videocam-outline';
      case 'mp3': case 'wav': case 'aac': return 'musical-notes-outline';
      default: return 'document-outline';
    }
  };

  const formatFileSize = (size) => {
    if (!size) return '';
    return size;
  };

  const renderFile = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.fileItem,
        selectedFiles.includes(item.id) && styles.selectedFile
      ]}
      onPress={() => {
        if (item.type === 'folder') {
          navigateToFolder(item.name);
        } else {
          toggleFileSelection(item.id);
        }
      }}
      onLongPress={() => toggleFileSelection(item.id)}
    >
      <View style={styles.fileLeft}>
        <View style={[
          styles.fileIcon,
          selectedFiles.includes(item.id) && styles.selectedIcon
        ]}>
          <Ionicons 
            name={getFileIcon(item)} 
            size={24} 
            color={selectedFiles.includes(item.id) ? '#fff' : '#ff6b35'} 
          />
        </View>
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>{item.name}</Text>
          <View style={styles.fileDetails}>
            <Text style={styles.fileSize}>{formatFileSize(item.size)}</Text>
            {item.size && <Text style={styles.fileSeparator}>•</Text>}
            <Text style={styles.fileDate}>{item.modified}</Text>
          </View>
        </View>
      </View>
      {selectedFiles.includes(item.id) && (
        <Ionicons name="checkmark-circle" size={20} color="#ff6b35" />
      )}
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>متصفح السحابية</Text>
        <TouchableOpacity 
          style={styles.headerAction}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add" size={24} color="#ff6b35" />
        </TouchableOpacity>
      </View>

      {/* Storage Info */}
      <View style={styles.storageCard}>
        <View style={styles.storageInfo}>
          <Text style={styles.storageTitle}>مساحة التخزين</Text>
          <Text style={styles.storageText}>
            {storageUsed} GB من {storageTotal} GB مستخدمة
          </Text>
        </View>
        <View style={styles.storageBar}>
          <View 
            style={[
              styles.storageProgress, 
              { width: `${(storageUsed / storageTotal) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Path Navigation */}
      <View style={styles.pathContainer}>
        <TouchableOpacity 
          style={styles.pathButton}
          onPress={navigateBack}
          disabled={currentPath === '/'}
        >
          <Ionicons 
            name="arrow-back" 
            size={16} 
            color={currentPath === '/' ? '#ccc' : '#666'} 
          />
        </TouchableOpacity>
        <Text style={styles.pathText}>
          {currentPath === '/' ? 'الجذر' : currentPath}
        </Text>
      </View>

      {/* Action Bar */}
      {selectedFiles.length > 0 && (
        <View style={styles.actionBar}>
          <Text style={styles.selectedCount}>
            {selectedFiles.length} محدد
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={shareFiles}
            >
              <Ionicons name="share-outline" size={20} color="#2196f3" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={deleteSelectedFiles}
            >
              <Ionicons name="trash-outline" size={20} color="#f44336" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setSelectedFiles([])}
            >
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Files List */}
      <FlatList
        data={files}
        renderItem={renderFile}
        keyExtractor={item => item.id}
        style={styles.filesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>لا توجد ملفات في هذا المجلد</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowUploadModal(true)}
      >
        <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Create Folder Modal */}
      <Modal
        visible={showCreateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>إنشاء مجلد جديد</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.textInput}
                placeholder="اسم المجلد"
                value={newFolderName}
                onChangeText={setNewFolderName}
                textAlign="right"
                autoFocus
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.modalButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.primaryButton]}
                onPress={createFolder}
              >
                <Text style={[styles.modalButtonText, styles.primaryButtonText]}>
                  إنشاء
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUploadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>رفع ملفات</Text>
              <TouchableOpacity onPress={() => setShowUploadModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.uploadOption} onPress={uploadFile}>
                <Ionicons name="camera-outline" size={24} color="#ff6b35" />
                <Text style={styles.uploadOptionText}>التقاط صورة</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadOption} onPress={uploadFile}>
                <Ionicons name="image-outline" size={24} color="#ff6b35" />
                <Text style={styles.uploadOptionText}>اختيار من المعرض</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadOption} onPress={uploadFile}>
                <Ionicons name="document-outline" size={24} color="#ff6b35" />
                <Text style={styles.uploadOptionText}>اختيار ملف</Text>
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
  headerAction: {
    padding: 8,
  },
  storageCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c2c2c',
  },
  storageText: {
    fontSize: 14,
    color: '#666',
  },
  storageBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  storageProgress: {
    height: '100%',
    backgroundColor: '#ff6b35',
    borderRadius: 2,
  },
  pathContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pathButton: {
    padding: 4,
    marginRight: 8,
  },
  pathText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b35',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  filesList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  selectedFile: {
    backgroundColor: '#fff5f0',
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedIcon: {
    backgroundColor: '#ff6b35',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    color: '#2c2c2c',
    fontWeight: '500',
    textAlign: 'right',
    marginBottom: 4,
  },
  fileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fileSize: {
    fontSize: 14,
    color: '#666',
  },
  fileSeparator: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  fileDate: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  uploadOptionText: {
    fontSize: 16,
    color: '#2c2c2c',
    marginLeft: 16,
    flex: 1,
    textAlign: 'right',
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

export default CloudBrowserScreen;