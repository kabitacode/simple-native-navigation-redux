import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Login from './screen/login';
import { reduxProvider } from './config/store';

const Screens = new Map();

Screens.set('login', Login);

// Register screens
Screens.forEach((C, key) => {
    Navigation.registerComponent(key,() => gestureHandlerRootHOC(reduxProvider(C)),() => C);
});

export const startApp = () => {
    Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'login',
                  options: {
                    topBar: {
                      visible: false
                    }
                  }
                },
              }
            ]
          }
        }
    });
};