import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BasicInfo = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');

    const handleSave = () => {
        // Save changes logic here
        console.log('Changes saved');
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>Name</ThemedText>
            <ThemedTextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <ThemedText style={styles.label}>Email</ThemedText>
            <ThemedTextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Save Changes" onPress={handleSave} />
        </ThemedView>
    );
};

export default BasicInfo;

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