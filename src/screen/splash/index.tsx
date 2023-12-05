import { NativeBaseProvider, Spinner, useToast } from "native-base"
import React, { useEffect } from "react"
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Navigation } from "react-native-navigation";
import { useSelector } from "react-redux"
import { nativeViewGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";
import Login from "../login";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { reduxProvider } from "../../config/store";
import Home from "../home";
import { startApp } from '../../authFlow';
import { startApp as noAuth } from '../../noAuth';
import { useCameraPermission, useCameraDevice, Camera, useCodeScanner } from "react-native-vision-camera";

function Splash() {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')

    useEffect(() => {
      requestPermission()
    
      return () => {
        
      }
    }, [])
    
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            const value = codes[0]?.value
            if (value == null) return
            console.log(value);
        }
      })

    if (device == null && hasPermission == false) {
        return (
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc999' }}>
                    <Spinner color="emerald.500" size={'lg'} />
                </SafeAreaView>
            </NativeBaseProvider>
        )
    } else {
        return (
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
            />
        )
    }
  
}

export default Splash