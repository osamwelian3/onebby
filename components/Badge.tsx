import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, ColorValue, useColorScheme, ViewProps, StyleProp } from 'react-native';

const Badge = ({ count, color = Colors.light.textInputBorder, size = 20, style }: {count?: number, color?: ColorValue, size?: number, style?: StyleProp<ViewProps>}) => {
    const colorScheme = useColorScheme()
    if (!count || count <= 0) return null;

    return (
        <View style={[{
            backgroundColor: color,
            borderRadius: size / 2,
            width: size,
            height: size,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: -1,
            right: -1
        }, style]}>
            <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black', fontSize: size / 2.5, fontWeight: 'bold' }}>
                {count > 99 ? '99+' : count}
            </Text>
        </View>
    );
};

export default Badge;