import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, Image, Pressable, SafeAreaView } from 'react-native';
import  * as ImagePicker from 'expo-image-picker';
import axios, { Axios } from 'axios';


export default function App() {

  const client = axios.create({
    baseURL: "https://7f6d-46-253-188-135.eu.ngrok.io"
  })

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync(
      {
        base64: true
      }
    );
    console.log(pickerResult.assets.length);
    if (pickerResult.assets.length > 0) {
        postImageResult(pickerResult.assets[0].base64);
    }
  };

   let postImageResult = async (base64) => {
    console.log(base64) 
    let response = await client.post("https://7f6d-46-253-188-135.eu.ngrok.io/api/image", {
      image: base64
     });
   };

  return (
    
    <SafeAreaView style={styles.container}>
      <Text 
      style={styles.titleText}>
        Upload an image
      </Text>

      <TouchableOpacity 
      style = {styles.buttonStyle}
      onPress={()=> openImagePickerAsync()}>
        <Image
          source={require('./assets/photo-camera.png')}
          style={styles.buttonImageIconStyle}
          >
        </Image>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImageIconStyle: {
    padding: 15,
    margin: 5,
    height: 45,
    width: 45,
    resizeMode: 'stretch',
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex',
    height:100
  },
  buttonStyle:{
    height:100,
    width:100,
    borderRadius:100,
    backgroundColor:"aqua",
    icon:"favicon.png",
    alignItems: 'center',
    justifyContent: 'center'
  }
});
