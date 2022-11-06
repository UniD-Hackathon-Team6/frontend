import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import LoginScreen from './src/login/LoginScreen';

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    </RecoilRoot>
  );
}
