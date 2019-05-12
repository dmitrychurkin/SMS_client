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
    appName: DeviceInfo.getApplicationName(),
    apiLevel: DeviceInfo.getAPILevel(),
    batteryLevel: null,
    brand: DeviceInfo.getBrand(),
    buildNumber: DeviceInfo.getBuildNumber(),
    bundleId: DeviceInfo.getBundleId(),
    carrier: DeviceInfo.getCarrier(),
    deviceCountry: DeviceInfo.getDeviceCountry(),
    deviceId: DeviceInfo.getDeviceId(),
    deviceLocale: DeviceInfo.getDeviceLocale(),
    preferredLocales: DeviceInfo.getPreferredLocales(),
    deviceName: DeviceInfo.getDeviceName(),
    firstInstallTime: new Date(DeviceInfo.getFirstInstallTime()),
    fontScale: DeviceInfo.getFontScale(),
    freeDiskStorage: DeviceInfo.getFreeDiskStorage(),
    ip: null,
    installReferrer: DeviceInfo.getInstallReferrer(),
    instanceId: DeviceInfo.getInstanceID(),
    lastUpdateTime: new Date(DeviceInfo.getLastUpdateTime()),
    mac: null,
    manufacturer: DeviceInfo.getManufacturer(),
    maxMemory: DeviceInfo.getMaxMemory(),
    model: DeviceInfo.getModel(),
    phoneNumber: DeviceInfo.getPhoneNumber(),
    readableVersion: DeviceInfo.getReadableVersion(),
    serialNumber: DeviceInfo.getSerialNumber(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    osBuildId: DeviceInfo.getBuildId(),
    timezone: DeviceInfo.getTimezone(),
    storageSize: DeviceInfo.getTotalDiskCapacity(),
    totalMemory: DeviceInfo.getTotalMemory(),
    uniqueId: DeviceInfo.getUniqueID(),
    userAgent: DeviceInfo.getUserAgent(),
    version: DeviceInfo.getVersion(),
    is24Hour: DeviceInfo.is24Hour(),
    airPlaneModeOn: null,
    isCharging: null,
    isEmulator: DeviceInfo.isEmulator(),
    isPinOrFingerprintSet: null,
    isTablet: DeviceInfo.isTablet(),
    isLandscape: DeviceInfo.isLandscape(),
    hasNotch: DeviceInfo.hasNotch(),
    deviceType: DeviceInfo.getDeviceType(),
    isAutoDateAndTime: null,
    isAutoTimeZone: null,
    supportedABIs: DeviceInfo.supportedABIs(),
    features: null
  };

  socket = null;

  componentDidMount() {
    DeviceInfo.getBatteryLevel()
      .then(batteryLevel => this.setState({ batteryLevel }));
    DeviceInfo.getIPAddress()
      .then(ip => this.setState({ ip }));
    DeviceInfo.getMACAddress()
      .then(mac => this.setState({ mac }));
    DeviceInfo.isAirPlaneMode()
      .then(airPlaneModeOn => this.setState({ airPlaneModeOn }));
    DeviceInfo.isBatteryCharging()
      .then(isCharging => this.setState({ isCharging }));
    DeviceInfo.isPinOrFingerprintSet()(isPinOrFingerprintSet => this.setState({ isPinOrFingerprintSet }));
    DeviceInfo.isAutoDateAndTime()
      .then(isAutoDateAndTime => this.setState({ isAutoDateAndTime }));
    DeviceInfo.isAutoTimeZone()
      .then(isAutoTimeZone => this.setState({ isAutoTimeZone }));
    DeviceInfo.getSystemAvailableFeatures()
      .then(features => this.setState({ features }));


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
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
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
