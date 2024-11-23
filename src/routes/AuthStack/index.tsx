import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddAccounts, Bio, Echo, Login} from '@screens';
import React from 'react';

const AuthStack = createNativeStackNavigator();
const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName="Echo">
      <AuthStack.Screen
        name="Echo"
        component={Echo}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Bio"
        component={Bio}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="AddAccounts"
        component={AddAccounts}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreens;
