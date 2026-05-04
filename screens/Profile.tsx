import APIClient from "@/api/client";
import * as ImagePicker from 'expo-image-picker';
import React,{ useState } from 'react';
import {
    Alert,
    Image,
    Linking,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


const Profile = () => {
    const [imageURI,setImageURI] = useState<string|null>(null);
    const [uploading,setUploading] = useState(false);

    async function requestPermission(type: 'camera' | 'library')
    {
        let { status: currentStatus } = (type === 'camera') ? await ImagePicker.getCameraPermissionsAsync() : await ImagePicker.getMediaLibraryPermissionsAsync();

        if (currentStatus === 'granted')
        {
            return true;
        }

        let { status: newStatus,canAskAgain } = (type === 'camera') ? await ImagePicker.requestCameraPermissionsAsync() : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (newStatus === 'granted')
        {
            return true;
        }

        if (canAskAgain === false)
        {
            Alert.alert("Permission Denied",`Please enable ${type} access in your system settings to upload a photo.`,[
                { text: "Cancel",style: "cancel" },
                { text: "Open Settings",onPress: () => Linking.openSettings() }
            ]);
        }

        return false;
    };

    async function pickImage(useCamera: boolean)
    {
        const hasPermission = await requestPermission(useCamera ? 'camera' : 'library');

        if (!hasPermission)
        {
            return null;
        }

        const options: ImagePicker.ImagePickerOptions = {
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.5,
        };

        const result = useCamera ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);

        if (result.canceled === false)
        {
            const selectedUri = (result.assets)[0].uri;
            setImageURI(selectedUri);
            uploadProfilePicture(selectedUri);
        }
    };

    async function uploadProfilePicture(uri: string)
    {
        setUploading(true);

        try
        {
            const formData = new FormData();

            formData.append('avatar',{
                uri: uri,
                name: 'profile-picture.jpg',
                type: 'image/jpeg',
            } as any);

            const response = await APIClient.post("/upload-avatar",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert("Success","Profile picture updated!");
        }
        catch (error)
        {
            console.error("Upload Error:",error);
            Alert.alert("Error","Failed to upload image.");
        }
        finally
        {
            setUploading(false);
        }
    };

    function retrieveProfileImageURI() : string
    {
        return "";
    };

    React.useEffect(() => {
        setImageURI(retrieveProfileImageURI());
    },[]);

    return (
        <SafeAreaView 
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    minHeight: 100,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: '100%',
                            aspectRatio: 1 / 1,
                            borderRadius: 1000,
                            borderWidth: 2,
                            borderColor: '#0F0F0F',
                        }}
                        onPress={() => {
                            pickImage(false);
                        }}
                    >
                        {(imageURI != null) ? (
                            <Image
                                source={{
                                    uri: imageURI,
                                }}
                                style={{
                                    height: '100%',
                                    aspectRatio: 1 / 1,
                                    borderRadius: 1000,
                                }}
                            />
                        ) : (
                            <View></View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flex: 9,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

            </View>
        </SafeAreaView>
    );
};

export default Profile;