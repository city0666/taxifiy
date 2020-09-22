import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import SplashScreen from '../Screens/Auth/SplashScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>

<RootStack.Screen name="SplashScreen" component={SplashScreen}/>                           
     <RootStack.Screen name = "SignInScreen" component={SignInScreen}/>
     <RootStack.Screen name = "SignUpScreen" component={SignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;