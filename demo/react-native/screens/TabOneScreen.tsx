import * as React from 'react';
import { StyleSheet } from 'react-native';
import Particles from "react-native-tsparticles";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Particles options={{
        backgroundMode: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: "#000"
        },
        particles: {
          links: {
            enable: true
          },
          move: {
            enable: true
          }
        }
      }} id="tsparticles" />
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
