import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import translateText from '@/utils/translate';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  ignore?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ignore = false,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const translate = useAppSelector((state) => state.category.translate);
  const [translatedText, setTranslatedText] = useState<ReactNode>(rest.children);

  useEffect(() => {
    const translateAsync = async () => {
      if (translate && !ignore && typeof rest.children === 'string') {
        const result = await translateText(rest.children, 'EN');
        setTranslatedText(result);
      } else {
        if (Array.isArray(rest.children)) {
          const translatedArray = await Promise.all(
            rest.children.map(async (item) => (typeof item === 'string' ? await translateText(item, 'EN') : item))
          );
          setTranslatedText(translatedArray);
        } else {
          setTranslatedText(rest.children);
        }
        
      }
    };

    translateAsync();
  }, [translate, ignore, rest.children]);

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    >
      {translatedText}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: { fontSize: 16, lineHeight: 24 },
  defaultSemiBold: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  title: { fontSize: 32, fontWeight: 'bold', lineHeight: 32 },
  subtitle: { fontSize: 20, fontWeight: 'bold' },
  link: { lineHeight: 30, fontSize: 16, color: '#0a7ea4' },
});



// import { Text, type TextProps, StyleSheet } from 'react-native';

// import { useThemeColor } from '@/hooks/useThemeColor';
// import { ReactNode, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import translateText from '@/utils/translate';
// import { useAppSelector } from '@/store';

// export type ThemedTextProps = TextProps & {
//   lightColor?: string;
//   darkColor?: string;
//   type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
//   ignore?: boolean
// };

// export function ThemedText({
//   style,
//   lightColor,
//   darkColor,
//   type = 'default',
//   ignore = false,
//   ...rest
// }: ThemedTextProps) {
//   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
//   const translate = useAppSelector((state) => state.category.translate)
//   const [newRest, setNewRest] = useState(rest)

//   const translateAsync = async (child: typeof rest.children) => {
//     if (translate && !ignore) {
//       if (typeof child === 'string') {
//         if (!isNaN(Number(child))) {
//           console.log('Number: ', child)
//           return child;
//         }
//         return await translateText(child, 'EN') as ReactNode
//       }
//       if (typeof child === 'object') {
//         const nodeArr = child as []
//         return nodeArr.map(async (item) => {
//           if (typeof item === 'string') {
//             return await translateText(item, 'EN')
//           } else {
//             return item
//           }
//         }) as ReactNode
//       }
//     } else {
//       return child;
//     }
//   }

//   useEffect(() => {
//     const trnslt = async () => {
//       setNewRest({...rest, children: await translateAsync(rest.children)})
//     }
//     trnslt()
//   }, [translate, ignore])

//   return (
//     <Text
//       style={[
//         { color },
//         type === 'default' ? styles.default : undefined,
//         type === 'title' ? styles.title : undefined,
//         type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
//         type === 'subtitle' ? styles.subtitle : undefined,
//         type === 'link' ? styles.link : undefined,
//         style,
//       ]}
//       {...newRest}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   default: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   defaultSemiBold: {
//     fontSize: 16,
//     lineHeight: 24,
//     fontWeight: '600',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     lineHeight: 32,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   link: {
//     lineHeight: 30,
//     fontSize: 16,
//     color: '#0a7ea4',
//   },
// });
