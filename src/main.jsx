import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppOffline from "./AppOffline.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import { NotificationProvider } from "./contexts/NotificationContext";

import PasswordCheck from "./components/PasswordCheck.jsx";

// registrace sw.js

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js").then(
      () => {
        console.log("Service Worker Registered");
      }, (error) => {
        console.log("Service Worker Registration Failed", error);
      }
    );
  }
  {/*
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  }
*/}
  
class OfflineIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offline: false };
  }

  componentDidMount() {
    window.addEventListener("offline", this.handleOffline);
    window.addEventListener("online", this.handleOnline);
  }

  componentWillUnmount() {
    window.removeEventListener("offline", this.handleOffline);
    window.removeEventListener("online", this.handleOnline);
  }

  handleOffline = () => {
    this.setState({ offline: true });
  };

  handleOnline = () => {
    this.setState({ offline: false });
  };

  render() {
    return (
      <React.StrictMode>
        <NotificationProvider>
          <UserProvider>
            {this.state.offline ? <AppOffline /> : <App />}
          </UserProvider>
        </NotificationProvider>
      </React.StrictMode>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <PasswordCheck>
    <OfflineIndicator />
    </PasswordCheck>
);