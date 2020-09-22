import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavController from './Navigation/NavController';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk';
import auth from './store/reducers/auth';
 import rider from './store/reducers/rider';
export default function App() {
  const rootReducer = combineReducers({ 
   auth: auth,
   rider: rider
    
  });

  const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
  return (
 

    <Provider store={store}>
   
   <NavController/>
   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
