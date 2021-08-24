import React, { createContext, useState, useEffect } from "react";
import firebaseApp from "./firebaseConfig";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [userLocation, setUserLocation] = useState();
  const [locationTrackingPermission, setLocationTrackingPermission] = useState();
  const [locationTracking, setLocationTracking] = useState();

  const [user, setUser] = useState();
  const [usersData, setUsersData] = useState([]);
  const dbRef = firebaseApp.database().ref();

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setUser);
  }, []);

  const saveSnapshot = (snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());

      const snapData = snapshot.val();

      const markers = [];

      Object.keys(snapData).forEach(key => {
        markers.push({
          ...snapData[key],
          id: key,
        });
      });

      console.log(markers);

      setUsersData(markers);
    } else {
      console.log("No data available");
      setUsersData([]);
    }
  }

  const writeUserData = (userData) => {
    const { coords } = userData;
    if (coords && user) {
      const { email, uid } = user;
      const {latitude, longitude, heading} = coords;
      const payload = {
        email: email.split("@")[0],
        timestamp: Date.now(),
        latitude,
        longitude,
        heading,
      }
      firebaseApp.database().ref(`users/${uid}`).set(payload);
    }
  }

  const authContextValue = {
    signup: (e, p) => firebaseApp.auth().createUserWithEmailAndPassword(e, p).then().catch(error => error),
    signin: (e, p) => firebaseApp.auth().signInWithEmailAndPassword(e, p).then().catch(error => error),
    signout: () => firebaseApp.auth().signOut(),
    setLocation: (location) => setUserLocation(location),
    writeData: writeUserData,
    readData: (data) => dbRef.child("users").get().then(saveSnapshot),
    monitorData: (data) => firebaseApp.database().ref(`users/`).on("value", saveSnapshot),
    setLocationTracking: (response) => setLocationTracking(response),
    setLocationTrackingPermission: (response) => setLocationTrackingPermission(response),
    locationTracking,
    locationTrackingPermission,
    currentLocation: userLocation,
    currentUser: user,
    usersData,
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
