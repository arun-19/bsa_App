import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera,CameraView} from 'expo-camera';
import { useUploadImageMutation } from '../../redux/service/user';

export default function CameraModal({ visible, setVisible, onPictureTaken,USER }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera?.Constants?.Type.back);
  const [isUpload,issetUpload]=useState(false)
  const [cameraRef, setCameraRef] = useState(null);
  const [uploadImage]=useUploadImageMutation()
  const onClose=()=>{
    setVisible(false)
   }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
   
    
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync({
          quality: 1,
          base64: true,
          skipProcessing: false,
          
        });
        issetUpload(true)

       
        const formdata=new FormData()
        formdata.append("file",{
         uri:photo?.uri,
          type: 'image/jpeg',
          name: 'image.jpg', 
        })
        formdata.append("USERNAME",USER?.userName)
         uploadImage(formdata).then((data)=>{
          onPictureTaken(photo.uri); // Pass the photo URI back to parent
          setVisible(false)
          issetUpload(false)
        // // Close the modal after taking picture 
         }).catch((err)=>{
           alert(err)
         })
        
      } catch (error) {
        console.error("Error taking picture: ", error);
      }
    }
  };

  const flipCamera = () => {
    setType(currentType => 
      currentType === Camera?.Constants?.Type.back
        ? Camera?.Constants?.Type.front
        : Camera?.Constants?.Type.back
    );
  };

  

  if (hasPermission === null) {
    return (
      <Modal visible={visible} transparent={true}>
        <View style={styles.loadingContainer}>
          <Text>Requesting camera permission...</Text>
        </View>
      </Modal>
    );
  }

  if (hasPermission === false) {
    return (
      <Modal visible={visible} transparent={true}>
        <View style={styles.loadingContainer}>
          <Text>No access to camera</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>

     {
    isUpload ? <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color="white" /><Text style={styles?.closeButtonText}>Uploading please Wait....</Text></View>:<CameraView
    style={styles.camera}
    type={type}
    ratio="16:9"
    ref={ref => setCameraRef(ref)}
  >
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
          <Text style={styles.buttonText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  </CameraView>
     }
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  captureButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    padding: 3,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});