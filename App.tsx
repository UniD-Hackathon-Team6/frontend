import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from "./src/navigation/MainNavigator";
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}