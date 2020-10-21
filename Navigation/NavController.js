import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RootStackScreen from './RootStackScreen';
import DrawerScreen from './DrawerScreen';
import StartupScreen from '../Screens/StartupScreen';

const NavController = ({ navigation }) => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);


    return(
        <NavigationContainer>   

{/* <DrawerScreen/> */}
 {!isAuth && didTryAutoLogin && <RootStackScreen></RootStackScreen>}
{isAuth && <DrawerScreen/>} 
{!isAuth && !didTryAutoLogin && <StartupScreen />} 
        </NavigationContainer> 


    )

}
export default NavController;
