/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SocketIOClient from 'socket.io-client';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {

  state = {
    socketId: null,
    appName: DeviceInfo.getApplicationName()
  };

  socket = null;

  componentDidMount() {
    const socket = SocketIOClient('wss://sms-service-spdev.herokuapp.com');

    socket.on('error', err => Alert.alert(
      'Socket error occured',
      JSON.stringify(err)
    ));
    socket.on('connect', () => {

      this.setState({ socketId: socket.id });
      Alert.alert(
        'Socket connected',
        'Websocket been connected to sms-service-spdev.herokuapp.com'
      );

      socket.on('message', ({ n, m } = {}) => {
        Alert.alert(
          'Socket message received',
          `Websocket received message from host sms-service-spdev.herokuapp.com:
            n -> ${n}
            m -> ${m}
          `
        );
      });

    });

    this.socket = socket;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Device info:</Text>
        {
          Object.entries(this.state).map(([key, value]) => (
            <Text key={key} style={styles.instructions}>{key} -> {JSON.stringify(value)}</Text>
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
