import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from 'react-native'
import { Navigation } from "react-native-navigation"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, Container, Heading, FormControl, Input, NativeBaseProvider, ScrollView } from "native-base"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuth } from "../../services/auth"
import { setToken } from "../../config/reducer/auth"
import { ThunkDispatch } from "@reduxjs/toolkit"


function Login(props: any) {
  const {loading, data, authenticated} : any = useSelector<any>(s => s.auth)
  const dispatch = useDispatch<any>();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    let params = {
      username: username,
      password: password
    }

    dispatch(fetchAuth(params))
  }

  useEffect(() => {
    if (authenticated) {
      Navigation.push(props.componentId, {component: {name: 'splash'}})
    }
  
    return () => {
      
    }
  }, [authenticated])
  
  useEffect(() => {
    const listener = {
      componentDidAppear: () => {
        console.log('RNN', `componentDidAppear`);        
      },
      componentDidDisappear: () => {
        console.log('RNN', `componentDidDisappear`);
      }
    };
    // Register the listener to all events related to our component
    const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);
    return () => {
      // Make sure to unregister the listener during cleanup
      unsubscribe.remove();
    };
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Box alignItems="center" marginTop={'1/5'}>
          <Heading size="md" marginBottom={'1/5'}>Login</Heading>
            <FormControl w="75%" maxW="300px" marginBottom={'12'}>
              <Box marginBottom={'3'}>
                <FormControl.Label>Username</FormControl.Label>
                <Input placeholder="Enter Username" value={username} onChangeText={(text) => setUsername(text)}/>
              </Box>
              <Box>
                <FormControl.Label>Password</FormControl.Label>
                <Input placeholder="Enter password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)}/>
              </Box>
            </FormControl>
            <Button width={'50%'} spinnerPlacement="end" onPress={() => handleSubmit()}>Submit</Button>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Login