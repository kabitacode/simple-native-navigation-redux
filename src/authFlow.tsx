import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Splash from './screen/splash';
import { reduxProvider } from './config/store';
import Home from './screen/home';
import Settings from './screen/settings';

const Screens = new Map();

Screens.set('home', Home);
// Screens.set('settings', Settings);

// Register screens
Screens.forEach((C, key) => {
    Navigation.registerComponent(key,() => gestureHandlerRootHOC(reduxProvider(C)),() => C);
});

export const startApp = () => {
    Navigation.setRoot({
        root: {
         bottomTabs: {
          children: [{
            stack: {
              children: [{
                component: {
                  name: 'home',
                  options: {
                    topBar: {
                        visible: true,
                        title: {
                            text: 'Home',
                        },
                    },
                    bottomTab: {
                      text: 'Home'
                    }
                },
                }
              }]
            },
          }]
         }
        }
    });
};