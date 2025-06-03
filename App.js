// // App.js
// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';       // For selecting profile photo
// import { captureRef } from 'react-native-view-shot';    // To capture the card view as an image
// import * as Print from 'expo-print';                    // To print (generate PDF)
// import * as Sharing from 'expo-sharing';                // To share or save files
// import QRCode from 'react-native-qrcode-svg';           // To generate QR code

// export default function App() {
//   // Form state
//   const [name, setName] = useState('');
//   const [sex, setSex] = useState('');
//   const [age, setAge] = useState('');
//   const [dept, setDept] = useState('');
//   const [photoUri, setPhotoUri] = useState(null);
//   // ID card state
//   const [showCard, setShowCard] = useState(false);
//   const [uniqueId, setUniqueId] = useState('');
//   const cardRef = useRef();  // Reference to the card view for capturing

//   // Function to pick image from library (requires asking permission)
//   const pickImageAsync = async () => {
//     // Request permission (for iOS)
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }

//     // Launch image picker
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setPhotoUri(result.assets[0].uri); // Save the selected image URI
//     } else {
//       alert('No image selected.');
//     }
//   };

//   // Handle form submission to generate the ID card
//   const handleGenerate = () => {
//     if (!name || !sex || !age || !dept || !photoUri) {
//       alert('Please fill all fields and select a photo.');
//       return;
//     }
//     // Generate a simple unique ID (e.g., random alphanumeric)
//     const newId = 'STID-' + Math.random().toString(36).substring(2, 8).toUpperCase();
//     setUniqueId(newId);
//     setShowCard(true); // Show the card view
//   };

//   // Handle exporting the card as PDF
//   const handleExport = async () => {
//     try {
//       // Capture the card view as an image (PNG file in cache)
//       const uri = await captureRef(cardRef, {
//         result: 'tmpfile',
//         quality: 1,
//         // You can set width/height if needed for resolution
//       });
//       // Construct simple HTML to include the captured image
//       const html = `
//         <div style="text-align:center; font-family: Arial;">
//           <img src="${uri}" style="width:100%;"/>
//         </div>`;
//       // Generate PDF from HTML
//       const { uri: pdfUri } = await Print.printToFileAsync({ html });
//       // Share or save the PDF
//       await Sharing.shareAsync(pdfUri);
//     } catch (error) {
//       console.error('Error exporting PDF:', error);
//     }
//   };

//   // Render form or ID card based on state
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {!showCard && (
//         <View style={styles.formContainer}>
//           <Text style={styles.heading}>INSA Talent Student ID Generator</Text>
//           {/* Name input */}
//           <TextInput
//             style={styles.input}
//             placeholder="Full Name"
//             value={name}
//             onChangeText={setName}
//           />
//           {/* Sex input */}
//           <TextInput
//             style={styles.input}
//             placeholder="Sex"
//             value={sex}
//             onChangeText={setSex}
//           />
//           {/* Age input */}
//           <TextInput
//             style={styles.input}
//             placeholder="Age"
//             value={age}
//             onChangeText={setAge}
//             keyboardType="numeric"
//           />
//           {/* Department input */}
//           <TextInput
//             style={styles.input}
//             placeholder="Department"
//             value={dept}
//             onChangeText={setDept}
//           />
//           {/* Profile photo picker */}
//           <TouchableOpacity style={styles.photoButton} onPress={pickImageAsync}>
//             <Text style={styles.photoButtonText}>Pick Profile Photo</Text>
//           </TouchableOpacity>
//           {/* Show selected photo preview */}
//           {photoUri && (
//             <Image source={{ uri: photoUri }} style={styles.photoPreview} />
//           )}
//           {/* Generate ID Card button */}
//           <Button title="Generate ID Card" onPress={handleGenerate} />
//         </View>
//       )}

//       {showCard && (
//         <View style={styles.cardContainer}>
//           {/* ID card view */}
//           <View style={styles.card} ref={cardRef}>
//             {/* Logo and Title */}
//             <View style={styles.cardHeader}>
//               <Image
//                 source={require('./assets/insa_logo.png')}
//                 style={styles.logo}
//                 resizeMode="contain"
//               />
//               <Text style={styles.cardTitle}>INSA Talent Student</Text>
//             </View>
//             {/* Student Photo */}
//             <Image source={{ uri: photoUri }} style={styles.studentPhoto} />
//             {/* Student Info */}
//             <View style={styles.infoSection}>
//               <Text style={styles.infoLabel}>Name: <Text style={styles.infoText}>{name}</Text></Text>
//               <Text style={styles.infoLabel}>Sex: <Text style={styles.infoText}>{sex}</Text></Text>
//               <Text style={styles.infoLabel}>Age: <Text style={styles.infoText}>{age}</Text></Text>
//               <Text style={styles.infoLabel}>Department: <Text style={styles.infoText}>{dept}</Text></Text>
//               <Text style={styles.infoLabel}>ID: <Text style={styles.infoText}>{uniqueId}</Text></Text>
//             </View>
//             {/* QR Code */}
//             <View style={styles.qrSection}>
//               <QRCode
//                 value={`${name} | ${sex} | ${age} | ${dept} | ${uniqueId}`}
//                 size={100}
//                 color="#000"
//                 backgroundColor="#fff"
//               />
//             </View>
//             {/* Signature */}
//             <View style={styles.signatureSection}>
//               <Text style={styles.signatureLabel}>Signature:</Text>
//               <Image
//                 source={require('./assets/signature.png')}
//                 style={styles.signatureImage}
//                 resizeMode="contain"
//               />
//             </View>
//           </View>
//           {/* Export PDF button */}
//           <Button title="Export Card as PDF" onPress={handleExport} />
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// // Styles for the app
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#eef3f9', // light background
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 400,
//     alignItems: 'center',
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#bbb',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   photoButton: {
//     backgroundColor: '#0074D9',
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   photoButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   photoPreview: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   cardContainer: {
//     alignItems: 'center',
//   },
//   card: {
//     width: 350,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     // Shadow for iOS
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     // Elevation for Android
//     elevation: 6,
//   },
//   cardHeader: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     marginBottom: 5,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#0074D9',
//   },
//   studentPhoto: {
//     width: 100,
//     height: 120,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginBottom: 10,
//   },
//   infoSection: {
//     width: '100%',
//     marginBottom: 10,
//   },
//   infoLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginVertical: 2,
//   },
//   infoText: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#000',
//   },
//   qrSection: {
//     marginVertical: 10,
//   },
//   signatureSection: {
//     alignItems: 'center',
//     marginTop: 10,
//     width: '100%',
//   },
//   signatureLabel: {
//     alignSelf: 'flex-start',
//     fontSize: 14,
//     color: '#333',
//   },
//   signatureImage: {
//     width: 100,
//     height: 50,
//     marginTop: 5,
//   },
// });


// // App.js
// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { captureRef } from 'react-native-view-shot';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import QRCode from 'react-native-qrcode-svg';

// export default function App() {
//   const [name, setName] = useState('');
//   const [sex, setSex] = useState('');
//   const [age, setAge] = useState('');
//   const [dept, setDept] = useState('');
//   const [photoUri, setPhotoUri] = useState(null);
//   const [showCard, setShowCard] = useState(false);
//   const [uniqueId, setUniqueId] = useState('');
//   const cardRef = useRef();

//   const pickImageAsync = async () => {
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setPhotoUri(result.assets[0].uri);
//     } else {
//       alert('No image selected.');
//     }
//   };

//   const handleGenerate = () => {
//     if (!name || !sex || !age || !dept || !photoUri) {
//       alert('Please fill all fields and select a photo.');
//       return;
//     }
//     const newId = 'STID-' + Math.random().toString(36).substring(2, 8).toUpperCase();
//     setUniqueId(newId);
//     setShowCard(true);
//   };

//   const handleExport = async () => {
//     try {
//       const uri = await captureRef(cardRef, {
//         result: 'tmpfile',
//         quality: 1,
//       });
//       const html = `<div style="text-align:center; font-family: Arial;"><img src="${uri}" style="width:100%;"/></div>`;
//       const { uri: pdfUri } = await Print.printToFileAsync({ html });
//       await Sharing.shareAsync(pdfUri);
//     } catch (error) {
//       console.error('Error exporting PDF:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {!showCard && (
//         <View style={styles.formContainer}>
//           <Text style={styles.heading}>INSA Talent Student ID Generator</Text>
//           <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
//           <TextInput style={styles.input} placeholder="Sex" value={sex} onChangeText={setSex} />
//           <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
//           <TextInput style={styles.input} placeholder="Department" value={dept} onChangeText={setDept} />
//           <TouchableOpacity style={styles.photoButton} onPress={pickImageAsync}>
//             <Text style={styles.photoButtonText}>Pick Profile Photo</Text>
//           </TouchableOpacity>
//           {photoUri && (<Image source={{ uri: photoUri }} style={styles.photoPreview} />)}
//           <Button title="Generate ID Card" onPress={handleGenerate} />
//         </View>
//       )}

//       {showCard && (
//         <View style={styles.cardContainer}>
//           <View style={styles.card} ref={cardRef}>
//             <View style={styles.cardHeader}>
//               <Image source={require('./assets/insa_logo.png')} style={styles.logo} resizeMode="contain" />
//               <Text style={styles.cardTitle}>INSA Talent Student</Text>
//             </View>
//             <View style={styles.contentRow}>
//               <View style={styles.leftSection}>
//                 <Text style={styles.infoLabel}>Name: <Text style={styles.infoText}>{name}</Text></Text>
//                 <Text style={styles.infoLabel}>Sex: <Text style={styles.infoText}>{sex}</Text></Text>
//                 <Text style={styles.infoLabel}>Age: <Text style={styles.infoText}>{age}</Text></Text>
//                 <Text style={styles.infoLabel}>Department: <Text style={styles.infoText}>{dept}</Text></Text>
//                 <Text style={styles.infoLabel}>ID: <Text style={styles.infoText}>{uniqueId}</Text></Text>
//               </View>
//               <View style={styles.rightSection}>
//                 <Image source={{ uri: photoUri }} style={styles.studentPhoto} />
//               </View>
//             </View>
//             <View style={styles.bottomRow}>
//               <View style={styles.signatureBlock}>
//                 <Text style={styles.signatureLabel}>Signature:</Text>
//                 <Image source={require('./assets/signature.png')} style={styles.signatureImage} resizeMode="contain" />
//               </View>
//               <View style={styles.qrBlock}>
//                 <QRCode value={`${name} | ${sex} | ${age} | ${dept} | ${uniqueId}`} size={80} color="#000" backgroundColor="#fff" />
//               </View>
//             </View>
//           </View>
//           <Button title="Export Card as PDF" onPress={handleExport} />
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#eef3f9',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 400,
//     alignItems: 'center',
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#bbb',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   photoButton: {
//     backgroundColor: '#0074D9',
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   photoButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   photoPreview: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   cardContainer: {
//     alignItems: 'center',
//   },
//   card: {
//     width: 360,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 6,
//   },
//   cardHeader: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     marginBottom: 5,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#0074D9',
//   },
//   contentRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 10,
//   },
//   leftSection: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   rightSection: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   studentPhoto: {
//     width: 100,
//     height: 120,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   infoLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginVertical: 2,
//   },
//   infoText: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#000',
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 10,
//   },
//   signatureBlock: {
//     flex: 1,
//     alignItems: 'flex-start',
//   },
//   signatureLabel: {
//     fontSize: 14,
//     color: '#333',
//   },
//   signatureImage: {
//     width: 100,
//     height: 50,
//     marginTop: 5,
//   },
//   qrBlock: {
//     alignItems: 'flex-end',
//     flex: 1,
//   },
// });


// // App.js
// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { captureRef } from 'react-native-view-shot';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import QRCode from 'react-native-qrcode-svg';

// export default function App() {
//   const [name, setName] = useState('');
//   const [sex, setSex] = useState('');
//   const [age, setAge] = useState('');
//   const [dept, setDept] = useState('');
//   const [photoUri, setPhotoUri] = useState(null);
//   const [showCard, setShowCard] = useState(false);
//   const [uniqueId, setUniqueId] = useState('');
//   const cardRef = useRef();

//   const pickImageAsync = async () => {
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setPhotoUri(result.assets[0].uri);
//     } else {
//       alert('No image selected.');
//     }
//   };

//   const handleGenerate = () => {
//     if (!name || !sex || !age || !dept || !photoUri) {
//       alert('Please fill all fields and select a photo.');
//       return;
//     }
//     const newId = 'STID-' + Math.random().toString(36).substring(2, 8).toUpperCase();
//     setUniqueId(newId);
//     setShowCard(true);
//   };

//   const handleExport = async () => {
//     try {
//       const uri = await captureRef(cardRef, {
//         result: 'tmpfile',
//         quality: 1,
//       });
//       const html = `<div style="text-align:center; font-family: Arial;"><img src="${uri}" style="width:100%;"/></div>`;
//       const { uri: pdfUri } = await Print.printToFileAsync({ html });
//       await Sharing.shareAsync(pdfUri);
//     } catch (error) {
//       console.error('Error exporting PDF:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {!showCard && (
//         <View style={styles.formContainer}>
//           <Text style={styles.heading}>INSA Talent Student ID Generator</Text>
//           <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
//           <TextInput style={styles.input} placeholder="Sex" value={sex} onChangeText={setSex} />
//           <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
//           <TextInput style={styles.input} placeholder="Department" value={dept} onChangeText={setDept} />
//           <TouchableOpacity style={styles.photoButton} onPress={pickImageAsync}>
//             <Text style={styles.photoButtonText}>Pick Profile Photo</Text>
//           </TouchableOpacity>
//           {photoUri && (<Image source={{ uri: photoUri }} style={styles.photoPreview} />)}
//           <Button title="Generate ID Card" onPress={handleGenerate} />
//         </View>
//       )}

//       {showCard && (
//         <View style={styles.cardContainer}>
//           <View style={styles.card} ref={cardRef}>
//             <View style={styles.cardHeader}>
//               <Image source={require('./assets/insa_logo.png')} style={styles.logo} resizeMode="contain" />
//               <Text style={styles.cardTitle}>INSA Talent Student</Text>
//             </View>
//             <View style={styles.contentRow}>
//               <View style={styles.leftSection}>
//                 <Text style={styles.infoLabel}>Name: <Text style={styles.infoText}>{name}</Text></Text>
//                 <Text style={styles.infoLabel}>Sex: <Text style={styles.infoText}>{sex}</Text></Text>
//                 <Text style={styles.infoLabel}>Age: <Text style={styles.infoText}>{age}</Text></Text>
//                 <Text style={styles.infoLabel}>Department: <Text style={styles.infoText}>{dept}</Text></Text>
//                 <Text style={styles.infoLabel}>ID: <Text style={styles.infoText}>{uniqueId}</Text></Text>
//               </View>
//               <View style={styles.rightSection}>
//                 <Image source={{ uri: photoUri }} style={styles.studentPhoto} />
//               </View>
//             </View>
//             <View style={styles.signatureOnlyBlock}>
//               <Text style={styles.signatureLabel}>Signature:</Text>
//               <Image source={require('./assets/signature.png')} style={styles.signatureImage} resizeMode="contain" />
//             </View>
//             {/* <View style={styles.qrOnlyBlock}>
//               <QRCode value={`${name} | ${sex} | ${age} | ${dept} | ${uniqueId}`} size={90} color="#000" backgroundColor="#fff" />
//             </View> */}
//           </View>
//           <Button title="Export Card as PDF" onPress={handleExport} />
//           <Text style={styles.infoLabel}> <Text style={styles.infoText}></Text></Text>
//           <Button title="Back to Form" onPress={() => setShowCard(false)} />
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#eef3f9',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 400,
//     alignItems: 'center',
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#bbb',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   photoButton: {
//     backgroundColor: '#0074D9',
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   photoButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   photoPreview: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   cardContainer: {
//     alignItems: 'center',
//   },
//   card: {
//     width: 360,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 6,
//   },
//   cardHeader: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     marginBottom: 5,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#0074D9',
//   },
//   contentRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 10,
//   },
//   leftSection: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   rightSection: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   studentPhoto: {
//     width: 100,
//     height: 120,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   infoLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginVertical: 2,
//   },
//   infoText: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#000',
//   },
//   signatureOnlyBlock: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   signatureLabel: {
//     fontSize: 14,
//     color: '#333',
//   },
//   signatureImage: {
//     width: 100,
//     height: 50,
//     marginTop: 5,
//   },
//   qrOnlyBlock: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
// });


// App.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { captureRef } from 'react-native-view-shot';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [dept, setDept] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [uniqueId, setUniqueId] = useState('');
  const cardRef = useRef();

  const pickImageAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    } else {
      alert('No image selected.');
    }
  };

  const handleGenerate = () => {
    if (!name || !sex || !age || !dept || !photoUri) {
      alert('Please fill all fields and select a photo.');
      return;
    }
    const techPrefix = 'STID';
    const binaryPart = Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const newId = `${techPrefix}-B${binaryPart}-${randomHex}`;
    setUniqueId(newId);
    setShowCard(true);
  };

  const handleExport = async () => {
  try {
    // Capture the card component
    const uri = await captureRef(cardRef, {
      result: 'tmpfile',
      quality: 1,
    });

    // Convert the captured URI to base64 for image embedding
    const base64Image = await fetch(uri).then(res => res.blob()).then(blob => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });

    // Create an HTML structure with embedded image
    const html = `
      <div style="text-align:center; font-family: Arial;">
        <img src="${base64Image}" style="width:100%;"/>
      </div>`;

    // Print to file and share the PDF
    const { uri: pdfUri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(pdfUri);
  } catch (error) {
    console.error('Error exporting PDF:', error);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!showCard && (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>INSA Talent Student ID Generator</Text>
          <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Sex" value={sex} onChangeText={setSex} />
          <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Department" value={dept} onChangeText={setDept} />
          <TouchableOpacity style={styles.photoButton} onPress={pickImageAsync}>
            <Text style={styles.photoButtonText}>Pick Profile Photo</Text>
          </TouchableOpacity>
          {photoUri && (<Image source={{ uri: photoUri }} style={styles.photoPreview} />)}
          <Button title="Generate ID Card" onPress={handleGenerate} />
        </View>
      )}

      {showCard && (
        <View style={styles.cardContainer}>
          <View style={styles.card} ref={cardRef}>
            <View style={styles.binaryBackground}>
              <Text style={styles.binaryText}>01001010 01100101 01110011 01110101 01110011 00100000 01101100 01101111 01110110 01100101 01110011 00100000 01111001 01101111 01110101</Text>
            </View>
            <View style={styles.cardHeader}>
              <Image source={require('./assets/insa_logo.png')} style={styles.logo} resizeMode="contain" />
              <Text style={styles.cardTitle}>INSA Talent Student</Text>
            </View>
            <View style={styles.contentRow}>
              <View style={styles.leftSection}>
                <Text style={styles.infoLabel}>Name: <Text style={styles.infoText}>{name}</Text></Text>
                <Text style={styles.infoLabel}>Sex: <Text style={styles.infoText}>{sex}</Text></Text>
                <Text style={styles.infoLabel}>Age: <Text style={styles.infoText}>{age}</Text></Text>
                <Text style={styles.infoLabel}>Department: <Text style={styles.infoText}>{dept}</Text></Text>
                <Text style={styles.infoLabel}>ID: <Text style={styles.infoText}>{uniqueId}</Text></Text>
              </View>
              <View style={styles.rightSection}>
                <Image source={{ uri: photoUri }} style={styles.studentPhoto} />
              </View>
            </View>
            <View style={styles.signatureOnlyBlock}>
              <Text style={styles.signatureLabel}>Signature:</Text>
              <Image source={require('./assets/signature.png')} style={styles.signatureImage} resizeMode="contain" />
            </View>
            {/* <View style={styles.qrOnlyBlock}>
              <QRCode value={`${name} | ${sex} | ${age} | ${dept} | ${uniqueId}`} size={90} color="#000" backgroundColor="#fff" />
            </View> */}
          </View>
          <Button title="Export Card as PDF" onPress={handleExport} />
          <Text style={styles.infoLabel}> <Text style={styles.infoText}></Text></Text>
          <Button title="Back to Form" onPress={() => setShowCard(false)} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eef3f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  photoButton: {
    backgroundColor: '#0074D9',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  photoPreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    width: 360,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    position: 'relative',
  },
  binaryBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.05,
  },
  binaryText: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0074D9',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentPhoto: {
    width: 100,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 2,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  signatureOnlyBlock: {
    alignItems: 'center',
    marginVertical: 10,
  },
  signatureLabel: {
    fontSize: 14,
    color: '#333',
  },
  signatureImage: {
    width: 100,
    height: 50,
    marginTop: 5,
  },
  qrOnlyBlock: {
    alignItems: 'center',
    marginTop: 10,
  },
});