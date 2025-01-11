// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker'; 


// const TestScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [prediction, setPrediction] = useState(null);

//   const handleImagePick = async () => {
//     try {
//       const image = await ImagePicker.openPicker({
//         width: 300,
//         height: 300,
//         cropping: true,
//         mediaType: 'photo',
//       });

//       const imageUri = image.path;
//       setSelectedImage(imageUri);
//       handleImageUpload(imageUri);
//     } catch (error) {
//       if (error.message !== 'User cancelled image selection') {
//         Alert.alert('Error', 'An error occurred while picking the image.');
//         console.error(error);
//       }
//     }
//   };

//   const handleImageUpload = async (imageUri) => {
//     setIsLoading(true);
//     setPrediction(null);

//     const formData = new FormData();
//     formData.append('image', {
//       uri: imageUri,
//       type: 'image/jpeg',
//       name: 'image.jpg',
//     });

//     try {
//       const response = await fetch('http://localhost:8000/api/predict/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch prediction.');
//       }

//       const data = await response.json();
//       setPrediction(data);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to analyze the image. Please try again.');
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Image
//           source={{ uri: 'https://example.com/bee-logo.png' }} // Replace with your logo URL or local asset
//           style={styles.logo}
//         />
//         <Text style={styles.title}>Honey Bee Classifier</Text>
//         <Text style={styles.subtitle}>
//           Upload an image to identify honey bees using advanced AI
//         </Text>
//       </View>

//       {/* Upload Section */}
//       <View style={styles.uploadContainer}>
//         <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
//           <Text style={styles.uploadText}>Drop your image here</Text>
//           <Text style={styles.uploadTextSmall}>or click to browse</Text>
//           <Text style={styles.uploadNote}>Supports JPG, PNG • Max 10MB</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Loading Indicator */}
//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#915B23" />
//           <Text style={styles.loadingText}>Analyzing image...</Text>
//         </View>
//       )}

//       {/* Image Preview and Results */}
//       {selectedImage && (
//         <View style={styles.resultsContainer}>
//           <Image source={{ uri: selectedImage }} style={styles.previewImage} />
//           {prediction && (
//             <View style={styles.predictionCard}>
//               <Text style={styles.predictionTitle}>Analysis Results</Text>
//               <View style={styles.predictionItem}>
//                 <Text>Classification:</Text>
//                 <Text style={styles.predictionValue}>{prediction.prediction}</Text>
//               </View>
//               <View style={styles.predictionItem}>
//                 <Text>Confidence:</Text>
//                 <View style={styles.confidenceWrapper}>
//                   <Text style={styles.predictionValue}>
//                     {(prediction.confidence * 100).toFixed(1)}%
//                   </Text>
//                   <View style={styles.confidenceBarContainer}>
//                     <View
//                       style={[
//                         styles.confidenceBar,
//                         { width: `${prediction.confidence * 100}%` },
//                       ]}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </View>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF8E7', // Background color matching your design
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#915B23', // Text color matching your design
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#915B23',
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
//   uploadContainer: {
//     width: '90%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   uploadBox: {
//     width: '100%',
//     height: 200,
//     borderWidth: 2,
//     borderColor: '#E5C29F',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFF',
//   },
//   uploadText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#915B23',
//   },
//   uploadTextSmall: {
//     fontSize: 16,
//     color: '#915B23',
//   },
//   uploadNote: {
//     fontSize: 12,
//     color: '#915B23',
//     marginTop: 10,
//   },
//   loadingContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#915B23',
//     marginTop: 10,
//   },
//   resultsContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   previewImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   predictionCard: {
//     backgroundColor: '#FFF',
//     padding: 20,
//     borderRadius: 10,
//     width: '90%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   predictionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#915B23',
//     marginBottom: 10,
//   },
//   predictionItem: {
//     marginBottom: 10,
//   },
//   predictionValue: {
//     fontWeight: 'bold',
//     color: '#915B23',
//   },
//   confidenceWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   confidenceBarContainer: {
//     flex: 1,
//     height: 10,
//     backgroundColor: '#E5C29F',
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   confidenceBar: {
//     height: '100%',
//     backgroundColor: '#915B23',
//     borderRadius: 5,
//   },
// });

// export default TestScreen;

import { View, Text } from 'react-native'
import React from 'react'

const TestScreen = () => {
  return (
    <View>
      <Text>TestScreen</Text>
    </View>
  )
}

export default TestScreen