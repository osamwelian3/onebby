import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        // Change password logic here
        console.log('Password changed');
        
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>Current Password</ThemedText>
            <ThemedTextInput
                style={styles.input}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            <ThemedText style={styles.label}>New Password</ThemedText>
            <ThemedTextInput
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <ThemedText style={styles.label}>Confirm Password</ThemedText>
            <ThemedTextInput
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Change Password" onPress={handleChangePassword} />
        </ThemedView>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
});
