import { NativeBaseProvider, Spinner, useToast } from "native-base"
import React, { useEffect } from "react"
import { SafeAreaView, View } from 'react-native'
import { Navigation } from "react-native-navigation";
import { useSelector } from "react-redux"
import { nativeViewGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";
import Login from "../login";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { reduxProvider } from "../../config/store";
import Home from "../home";
import { startApp } from '../../authFlow';
import { startApp as noAuth } from '../../noAuth';

function Splash() {
    const { data, loading, authenticated } = useSelector(s => s.auth);
    const toast = useToast();

    useEffect(() => {
        if (data?.message == 'Invalid credentials') {
            toast.show({
                description: "Invalid credentials!"
            })
        }

        if (authenticated) {
           startApp()
        } else {
           noAuth()
        }
        return () => {}
    }, [data, authenticated])


    return (
        <NativeBaseProvider>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc999' }}>
                <Spinner color="emerald.500" size={'lg'} />
            </SafeAreaView>
        </NativeBaseProvider>
    )
}

export default Splash