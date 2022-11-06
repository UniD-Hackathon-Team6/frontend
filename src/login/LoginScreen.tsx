import React, {Component} from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Button,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {FlipInEasyX} from 'react-native-reanimated';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const navigation = useNavigation();

  const onSignup = () => {
    navigation.navigate('HomeScreen');
  };
  const onSignin = async () => {
    try {
      const u = await axios.post(
        'http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/users/sign-in',
        {
          email: email,
          password: password,
        },
      );
      console.log(u.data);
    } catch (e) {
      console.log(e);
    }
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: 20,
      }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Button onPress={onSignin} title="Sign in" color="#841584" />
        <View style={{width: 20, height: 20}} />
        <Button onPress={onSignup} title="Sign up" color="#f194ff" />
      </View>
    </SafeAreaView>
  );
}
