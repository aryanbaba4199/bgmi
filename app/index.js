/**
 * @format
 */

import {AppRegistry, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import AppProvider from './Context/AppContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function Main() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {' '}
        <AppProvider>
          
          <App />
        
        </AppProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
