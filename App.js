import React from 'react'
import { View,Text } from 'react-native'
import Dashboard from './src/components/Dashboard/Dashboard'
import AddItem from './src/components/AddItem/AddItem'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import store from './src/redux/store'


let persistor = persistStore(store);

const App = () => {
  const Stack=createNativeStackNavigator()
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Add' screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name='Dashboard' component={Dashboard} />
            <Stack.Screen name='Add' component={AddItem} />
            
      </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
      </Provider>
      

  )
}

export default App