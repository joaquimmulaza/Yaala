import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colors';
import { useCallback, useEffect, useState } from 'react';
import supportedLanguages from '../utils/supportedLanguages';

export default function HomeScreen(props) {
  const params = props.route.params || {};
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("fr");
  const [languageFrom, setLanguageFrom] = useState("en");

  useEffect(() => {
    if (params.languageTo) {
        setLanguageTo(params.languageTo);
    }

    if (params.languageFrom) {
        setLanguageFrom(params.languageFrom);
    }
  }, [params.languageTo, params.languageFrom])

  const onSubmit = useCallback(() => {
    const axios = require("axios");

    const options = {
      method: 'GET',
      url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
      params: {text: 'Hello world', to: 'es', from: 'en'},
      headers: {
        'X-RapidAPI-Key': '7fb15711b0mshdcf75f9ebce235ep112814jsne23cb9110ba4',
        'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch( function (error) {
      console.error(error);
    });
  })

  return (
      <View style={styles.container}>
       <View style={styles.languageContainer}>

        <TouchableOpacity 
          style={styles.languageOption}
          onPress={() => props.navigation.navigate("languageSelect", { title: 'Tranduzir de', selected: languageFrom, mode: 'from' })}
        >
          <Text style={ styles.languageOptionText }>{supportedLanguages[languageFrom]}</Text>
        </TouchableOpacity>

        <View style={styles.arrowContainer}>
          <AntDesign name="arrowright" size={24} color={colors.lightGrey}/>
        </View>

        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => props.navigation.navigate("languageSelect", { title: 'Tranduzir para', selected: languageTo, mode: 'to' })}
        >
          <Text style={ styles.languageOptionText } >{supportedLanguages[languageTo]}</Text>
        </TouchableOpacity>
       </View>

       <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder='Digite o texto aqui'
          onChangeText={(text) => setEnteredText(text)}
        />

        <TouchableOpacity
          onPress={onSubmit}
          disabled={enteredText === ""}
          style={styles.iconContainer}>
          <Ionicons 
            name='arrow-forward-circle-sharp' 
            size={24} 
            color={enteredText !== "" ? colors.primary : colors.primaryDisabled} />
        </TouchableOpacity>
       </View>

       <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{resultText}</Text>

        <TouchableOpacity 
          disabled={resultText === ""}
          style={styles.iconContainer}>
          <MaterialIcons 
            name='content-copy' 
            size={24} 
            color={resultText !== "" ? colors.textColor : colors.textColorDisabled} />
        </TouchableOpacity>
       </View>

       <View style={styles.historyContainer}>

       </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageContainer:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey
  },
  languageOption:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  arrowContainer:{
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOptionText:{
    color: colors.primary,
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
  inputContainer:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  textInput:{
    flex: 1,
    fontFamily: 'medium',
    letterSpacing: 0.3,
    color: colors.textColor,
    paddingHorizontal: 20,
    height: 90,
    paddingVertical: 15
  },
  iconContainer:{
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultContainer:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    height: 90,
    paddingVertical: 15,
  },
  resultText:{
    fontFamily: 'regular',
    letterSpacing: 0.3,
    color: colors.primary,
    flex: 1,
    marginHorizontal: 20
  },
  historyContainer:{
    backgroundColor: colors.greyBackground,
    flex: 1,
    padding: 10
  }
});
