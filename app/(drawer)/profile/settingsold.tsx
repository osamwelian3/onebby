import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Tab = Tabs;

const BasicInfo = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');

    const handleSave = () => {
        // Save changes logic here
        console.log('Changes saved');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Save Changes" onPress={handleSave} />
        </View>
    );
};

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        // Change password logic here
        console.log('Password changed');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            <Text style={styles.label}>New Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Change Password" onPress={handleChangePassword} />
        </View>
    );
};

const Settings = () => {
    return (
        <Tab screenLayout={
            (props) => (
                <View style={{ flex: 1 }}>
                    {props.children}
                </View>
            )
        }>
            <Tab.Screen name="Basic Info" component={BasicInfo} />
            <Tab.Screen name="Change Password" component={ChangePassword} />
        </Tab>
    );
};

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

export default Settings;