import { TextInput, type TextInputProps, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { forwardRef, ReactNode } from "react";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "outlined" | "underlined";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
  (
    {
      style,
      lightColor,
      darkColor,
      type = "default",
      leftIcon,
      rightIcon,
      ...rest
    },
    ref
  ) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const backgroundColor = useThemeColor(
      { light: "#f0f0f0", dark: "#1e1e1e" },
      "background"
    );
    const borderColor = useThemeColor(
      { light: "#ccc", dark: "#555" },
      "textInputBorder"
    );

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
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <TextInput
          ref={ref}
          style={[styles.input, { color }]}
          placeholderTextColor={color}
          {...rest}
        />
        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    height: "100%",
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


// import { TextInput, type TextInputProps, StyleSheet, View } from "react-native";
// import { useThemeColor } from "@/hooks/useThemeColor";
// import { forwardRef, ReactNode, useRef } from "react";

// export type ThemedTextInputProps = TextInputProps & {
//   lightColor?: string;
//   darkColor?: string;
//   type?: "default" | "outlined" | "underlined";
//   leftIcon?: ReactNode;
//   rightIcon?: ReactNode;
// };

// export const ThemedTextInput = ({
//   style,
//   lightColor,
//   darkColor,
//   type = "default",
//   leftIcon,
//   rightIcon,
//   ...rest
// }: ThemedTextInputProps, ref: React.LegacyRef<TextInput>) => {
//   const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
//   const backgroundColor = useThemeColor({ light: "#f0f0f0", dark: "#1e1e1e" }, "background");
//   const borderColor = useThemeColor({ light: "#ccc", dark: "#555" }, "textInputBorder");
//   const textInputRef = ref || useRef<TextInput>(null);

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor, borderColor },
//         type === "outlined" ? styles.outlined : undefined,
//         type === "underlined" ? styles.underlined : undefined,
//         style,
//       ]}
//     >
//       {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
//       <TextInput
//         ref={textInputRef}
//         style={[styles.input, { color }]}
//         placeholderTextColor={color}
//         {...rest}
//       />
//       {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 0,
//     height: 45
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     paddingHorizontal: 8,
//     height: '100%'
//   },
//   outlined: {
//     borderWidth: 1,
//   },
//   underlined: {
//     borderBottomWidth: 1,
//   },
//   icon: {
//     marginHorizontal: 5,
//   },
// });
