/** @format */

import { AppRegistry } from "react-native";
import Reactotron from "reactotron-react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

AppRegistry.registerComponent(appName, () => App);
