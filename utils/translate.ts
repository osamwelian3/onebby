import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

const GOOGLE_API_KEY = "AIzaSyC0gyU6bISLo1Kh3znsJu51b3Y3x-elnnM";
const API_URL = "https://api-free.deepl.com/v2/translate";

const translateText = async (text: string, targetLanguage: string) => {
    if (text === 'Casa') {
        Alert.alert(text, targetLanguage)
    }
    try {
        const cache = await AsyncStorage.getItem(text)
        if (cache) {
            console.log('From cache')
            return cache
        }
        const response = await axios.post(
            `${API_URL}`,
            {
                text: [
                  text
                ],
                "target_lang": targetLanguage
            },
            {
                headers: { 
                    'Authorization': 'DeepL-Auth-Key a13df6f6-16c1-4ec9-8139-2585f4f124dc:fx', 
                    'Content-Type': 'application/json'
                }
            }
        );
    
        console.log(JSON.stringify(response.data, null, 2))
        await AsyncStorage.setItem(text, response.data.translations[0].text as string)
        await AsyncStorage.setItem(response.data.translations[0].text as string, text)
        return response.data.translations[0].text as string
        
    } catch (error) {
        console.error('Error: ', error)
        return text;
    }
}

export default translateText;