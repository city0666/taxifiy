
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    DrawerItem,
    createDrawerNavigator,
    DrawerContentScrollView,
  } from '@react-navigation/drawer';

import Animated from 'react-native-reanimated';
import { Feather, AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { Block, Button, Text } from 'expo-ui-kit';
import { LinearGradient } from 'expo-linear-gradient';
import color from '../constants/color';
import {useSelector,useDispatch} from 'react-redux';
import RiderHome from '../Screens/InnerScreen/riderHome';
import test from '../Screens/InnerScreen/test';
import Sockettest from '../Screens/InnerScreen/sockettest';
import ModelSceen from '../Screens/InnerScreen/ModelSceen';



import * as authActions from '../store/actions/auth';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => {
    return (
      <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitle: null,
            headerLeft: () => (
              <Button transparent onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons name="xbox-controller-menu" size={30} color= {color.hoonowhite}  style={{ paddingHorizontal: 10 }} />
              </Button>
            ),
          }}>
                      <Stack.Screen name="Home" component={RiderHome}></Stack.Screen>

                    <Stack.Screen name="ModelSceen" component={ModelSceen}></Stack.Screen>

                    <Stack.Screen name="test" component={test}></Stack.Screen>

          <Stack.Screen name="Sockettest" component={Sockettest}></Stack.Screen>

          
          {/* <Stack.Screen name="Messages">{props => <riderHome {...props} />}</Stack.Screen>
          <Stack.Screen name="Contact">{props => <riderHome {...props} />}</Stack.Screen>
          <Stack.Screen name="TripPlanner">{props => <riderHome {...props} />}</Stack.Screen> */}

        </Stack.Navigator>
      </Animated.View>
    );
  };

  const DrawerContent = props => {

   const dispatch = useDispatch();

 
  const {name,email} = useSelector((state) =>{
  return state.auth
  })
    return (
      <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
        <Block>
          <Block flex={0.4} margin={20} bottom>
            <Image
              source={{
                uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                height: 60,
                width: 60,
                scale: 0.5,
              }}
              resizeMode="center"
              style={styles.avatar}
            />
            <Text white title>
            {name}
            
            </Text>
            <Text white size={13}>
            {email}

            </Text>
          </Block>
          <Block>
            <DrawerItem
              label="Dashboard"
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => props.navigation.navigate('ModelSceen')}
              icon={() => <AntDesign name="dashboard" color="white" size={16} />}
            />
            <DrawerItem
              label="Messages"
              labelStyle={{ color: 'white', marginLeft: -16 }}
              style={{ alignItems: 'flex-start', marginVertical: 0 }}
              onPress={() => props.navigation.navigate('Sockettest')}
              icon={() => <AntDesign name="message1" color="white" size={16} />}
            />
            <DrawerItem
              label="Contact us"
              labelStyle={{ color: 'white', marginLeft: -16 }}
              style={{ alignItems: 'flex-start', marginVertical: 0 }}
              onPress={() => props.navigation.navigate('test')}
              icon={() => <AntDesign name="phone" color="white" size={16} />}
            />
              <DrawerItem
              label="TripPlanner"
              labelStyle={{ color: 'white', marginLeft: -16 }}
              style={{ alignItems: 'flex-start', marginVertical: 0 }}
              onPress={() => props.navigation.navigate('Home')}
              icon={() => <AntDesign name="customerservice" color="white" size={16} />}
            />
          </Block>
        </Block>
  
        <Block flex={false}>
          <DrawerItem
            label="Logout"
            labelStyle={{ color: 'white' }}
            icon={() => <AntDesign name="logout" color="white" size={16} />}
            onPress={() => dispatch(authActions.logout())}
          />
        </Block>
      </DrawerContentScrollView>
    );
  };
  export default () => {
    const [progress, setProgress] = React.useState(new Animated.Value(0));
    const scale = Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [0, 1.6],
    });
  
    const animatedStyle = { borderRadius, transform: [{ scale }] };
    // const animatedStyle = { borderRadius:[{borderRadius}], transform: [{ scale }] };

  
    return (
      <LinearGradient style={{ flex: 1 }} colors={[color.bgmain, color.hoono]}>
        <Drawer.Navigator
          // hideStatusBar
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={styles.drawerStyles}
          contentContainerStyle={{ flex: 1 }}
          drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'white',
            inactiveTintColor: 'white',
          }}
          sceneContainerStyle={{ backgroundColor: 'transparent' }}
          drawerContent={props => {
            setProgress(props.progress);
            return <DrawerContent {...props} />;
          }}>
          <Drawer.Screen name="Screens">
            {props => <Screens {...props} style={animatedStyle} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </LinearGradient>
    );
  };

  const styles = StyleSheet.create({
    stack: {
      flex: 1,
      shadowColor: '#FFF',
      
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 5,
      // overflow: 'scroll',
      // borderWidth: 1,
    },
    drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
    drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
    drawerLabel: { color: 'white', marginLeft: -16 },
    avatar: {
      borderRadius: 60,
      marginBottom: 16,
      borderColor: 'white',
      borderWidth: StyleSheet.hairlineWidth,
      overflow:"hidden"
    },
  });