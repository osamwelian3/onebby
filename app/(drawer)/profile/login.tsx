import { BackHandler, Button, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useNavigation, useRouter } from 'expo-router'
import { ThemedTextInput } from '@/components/ThemedTextInput'
import { Colors } from '@/constants/Colors'

const LoginWithEmail = () => {
    const [loginScreen, setLoginScreen] = useState(true)
    const [forgetPassword, setForgetPassword] = useState(false)
    const router = useRouter()
    const colorScheme = useColorScheme()
    // Navigation
    const navigation = useNavigation();

    // Effect
    useEffect(() => { 
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            console.log('onback pre handle ', forgetPassword)
            // Do your stuff here
            if (forgetPassword) {
                console.log('onback setforgetpassword false ', forgetPassword);
                setForgetPassword(false)
                return true
            } else {
                console.log('onback ', !forgetPassword);
                router.back()
                return true
            }
        })

        return () => {
            backHandler.remove()
        };
    }, [forgetPassword]);
  return (
    <ThemedView style={styles.root}>
        <ThemedView style={{flexDirection: 'row', alignItems: 'center', padding: 10, width: '100%'}}>
            <TouchableOpacity onPress={() => router.back()} style={{flex: 0, padding: 5}}>
                <ThemedText>x</ThemedText>
            </TouchableOpacity>
            <ThemedText style={{marginLeft: '25%'}}>Sign In or Create account</ThemedText>
        </ThemedView>
        {
            forgetPassword ? 
            <ThemedView style={{width: '100%', height: '100%', alignItems: 'center', padding: 10, position: 'absolute', top: 20, left: 0, zIndex: 100}}>
                <ThemedView style={{marginVertical: 10, width: '100%'}}>
                    <TouchableOpacity onPress={() => setForgetPassword(false)}>
                        <ThemedText style={{margin: 5, width: '100%'}}>x</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
                <ThemedView style={{marginVertical: 10}}>
                    <ThemedText style={{margin: 5}}>Enter the email address registered to your account. We will send instructions on how to recover your password.</ThemedText>
                    <ThemedTextInput placeholder="Enter recovery email" style={{width: '80%'}} />
                </ThemedView>
                <ThemedView style={{marginVertical: 10}}>
                    <Button color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} title='Send' />
                </ThemedView>
            </ThemedView>
            : null
        }
        {
            loginScreen ? 
            <ThemedView style={{width: '90%', alignItems: 'center', padding: 5}}>
                <ThemedView style={{marginVertical: 10}}>
                    <ThemedText style={{margin: 5}}>Email/Username</ThemedText>
                    <ThemedTextInput placeholder="Enter email or username" style={{width: '80%'}} />
                </ThemedView>
                <ThemedView style={{marginVertical: 10}}>
                    <ThemedText style={{margin: 5}}>Password</ThemedText>
                    <ThemedTextInput inputMode='text' secureTextEntry passwordRules={'minlength:6;'} placeholder="********" style={{width: '80%'}} />
                    <ThemedText style={{justifyContent: 'center', alignItems: 'center', fontSize: 12, fontStyle: 'italic'}}>Forgot password?{' '}<TouchableOpacity style={{height: 28}} onPress={() => setForgetPassword(true)}><ThemedText style={{justifyContent: 'center', marginTop: 5, fontSize: 12}}>Recover</ThemedText></TouchableOpacity></ThemedText>
                </ThemedView>
                <ThemedView style={{marginVertical: 10}}>
                    <Button color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} title='Login' />
                </ThemedView>
                <ThemedView style={{marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <ThemedText style={{justifyContent: 'center', alignItems: 'center'}}>Don't have an account?{' '}<TouchableOpacity style={{height: 28}} onPress={() => setLoginScreen(false)}><ThemedText style={{justifyContent: 'center', marginTop: 5}}>Register</ThemedText></TouchableOpacity></ThemedText>
                </ThemedView>
            </ThemedView>
            :
            <ThemedView style={{width: '90%', alignItems: 'center', padding: 5}}>
                <ThemedView style={{marginVertical: 10}}>
                    <ThemedText style={{margin: 5}}>Username</ThemedText>
                    <ThemedTextInput placeholder="Enter username" style={{width: '80%'}} />
                </ThemedView>
                <ThemedView style={{marginVertical: 10}}>
                    <ThemedText style={{margin: 5}}>Email</ThemedText>
                    <ThemedTextInput placeholder="Enter email" style={{width: '80%'}} />
                </ThemedView>
                <ThemedView style={{marginVertical: 10}}>
                    <ThemedText style={{margin: 5}}>Password</ThemedText>
                    <ThemedTextInput inputMode='text' secureTextEntry passwordRules={'minlength:6;'} placeholder="********" style={{width: '80%'}} />
                </ThemedView>
                <ThemedView style={{marginVertical: 10}}>
                    <ThemedText style={{margin: 5}}>Repeat Password</ThemedText>
                    <ThemedTextInput inputMode='text' secureTextEntry passwordRules={'minlength:6;'} placeholder="********" style={{width: '80%'}} />
                </ThemedView>
                <ThemedView style={{marginVertical: 10}}>
                    <Button color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} title='Signup' />
                </ThemedView>
                <ThemedView style={{marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <ThemedText style={{justifyContent: 'center', alignItems: 'center'}}>Already have an account?{' '}<TouchableOpacity style={{height: 28}} onPress={() => setLoginScreen(true)}><ThemedText style={{justifyContent: 'center', marginTop: 5}}>Login</ThemedText></TouchableOpacity></ThemedText>
                </ThemedView>
            </ThemedView>
        }
    </ThemedView>
  )
}

export default LoginWithEmail

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        position: 'relative'
    }
})