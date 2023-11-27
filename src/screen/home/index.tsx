import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from "react-redux";

import {getToken, logout} from '../../config/reducer/auth'
import reduxStorage from '../../config/storage';
import { useEffect } from 'react';


function Home(props:any) {
    const dispatch = useDispatch<any>();
    const {loading, data, authenticated} : any = useSelector<any>(s => s.auth)

    // const renderItem = ({item, index}: any) => {
    //     return (
    //         <View>
    //             <Text>{item.title}</Text>
    //         </View>
    //     )
    // }

    useEffect(() => {
        if (!authenticated) {
          Navigation.push(props.componentId, {component: {name: 'splash'}})
        }
      
        return () => {
          
        }
      }, [data])


    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 20 }}>
                <TouchableOpacity onPress={ async () => {
                    dispatch(logout())
                    await reduxStorage.removeItem('token')
                }}>
                    <Text>Logout</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => dispatch(fetchAuth())} style={styles.btn}>
                    <Text>Press Me</Text>
                </TouchableOpacity> */}
           
{/* 
            <TouchableOpacity onPress={() => dispatch(clearState(''))} style={styles.btn}>
                    <Text>Clear</Text>
                </TouchableOpacity> */}

            {/* {loading && <ActivityIndicator />} */}

            {/* <FlatList
                data={data.products || data}
                renderItem={renderItem}
                refreshing={false}
                onRefresh={() => {
                    dispatch(clearState('clear'))
                    dispatch(fetchAuth())
                }}
            /> */}
             </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        backgroundColor: '#ABC890',
        alignItems: 'center',
        margin: 10
    }
})
  
export default Home