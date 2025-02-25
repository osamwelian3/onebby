import { TextInput, type TextInputProps, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ReactNode } from "react";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "outlined" | "underlined";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = "default",
  leftIcon,
  rightIcon,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor({ light: "#f0f0f0", dark: "#1e1e1e" }, "background");
  const borderColor = useThemeColor({ light: "#ccc", dark: "#555" }, "border");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderColor },
        type === "outlined" ? styles.outlined : undefined,
        type === "underlined" ? styles.underlined : undefined,
        style,
      ]}
    >
      {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
      <TextInput
        style={[styles.input, { color }]}
        placeholderTextColor={color}
        {...rest}
      />
      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  outlined: {
    borderWidth: 1,
  },
  underlined: {
    borderBottomWidth: 1,
  },
  icon: {
    marginHorizontal: 5,
  },
});
