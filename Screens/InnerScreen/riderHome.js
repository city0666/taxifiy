import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View,ScrollView,Input,Dimensions ,TextInput,ActivityIndicator,TouchableHighlight, Alert } from 'react-native';
import MapView , { Polyline, Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import _ from "lodash";
import Colors from '../../constants/color';
import apiKey from "./google_api_key";

const RiderHome = ({navigation}) => {

  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const onChangeDestinationDebounced = useCallback(_.debounce(onChangeDestination, 1000), []);
  const [destination, setdestination] = useState(null); 
  const [predictions, setpredictions] = useState([]); 
   let onChangeDestinationDebounced = null;
   if (!destination){
    onChangeDestinationDebounced = _.debounce(onChangeDestination,1000);
   }

  useEffect(() => {
    async function cureentlocation() {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
    try{
      let currentlocation = await Location.getCurrentPositionAsync({});
      // dispatch({type:"ADD_Location",payload:location})
      setlocation(currentlocation)
    }
    catch (err) {
      console.error(err);
    }
     
          
    }
  
   
    cureentlocation()
    const text = JSON.stringify(location);
  
    console.log(text,"wait..")

    // if (location===null){
    //   cureentlocation()
    //   cureentlocation()
    //   const text = JSON.stringify(location);
    
    //   console.log(text,"test..")
    // }
  }, [])


if(location === null){
  return(
    <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
          <ActivityIndicator size="large" color={Colors.primary} />


    </View>
  )
}
async function onChangeDestination (destination) {
  console.log(location, 'nullll');

  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
  &input=${destination}&location=${location.coords.latitude},${
    location.coords.longitude
  }&radius=2000`;
  console.log(apiUrl);
  try {
    const result = await fetch(apiUrl);
    const json = await result.json();
    setpredictions(json.predictions)
    const text = JSON.stringify(json.predictions);

    // this.setState({
    //   predictions: json.predictions
    // });
    console.log(text);
    Alert.alert(text)
  } catch (err) {
    console.error(err);
  }
}
// if (predictions != null) {
//    predictions.map(prediction => (
//     <TouchableHighlight
//       onPress={() =>
//         getRouteDirections(
//           prediction.place_id,
//           prediction.structured_formatting.main_text
//         )
//      }
//       key={prediction.id}
//     >
//       <View>
//         <Text style={styles.suggestions}>
//           {prediction.structured_formatting.main_text}
//         </Text>
//       </View>
//     </TouchableHighlight>
//   ));
// }


// async function getRouteDirections(destinationPlaceId, destinationName) {
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/directions/json?origin=${
//         location.coords.latitude
//       },${
//         location.coords.longitude
//       }&destination=place_id:${destinationPlaceId}&key=${apiKey}`
//     );
//     const json = await response.json();
//     console.log(json);
//    // const points = PolyLine.decode(json.routes[0].overview_polyline.points);
//     //const pointCoords = points.map(point => {
//      // return { latitude: point[0], longitude: point[1] };
//     //});

//     // this.setState({
//     //   pointCoords,
//     //   predictions: [],
//     //   destination: destinationName,
//     //   routeResponse: json,
//     // });
//     Keyboard.dismiss();
//     this.map.fitToCoordinates(pointCoords);
//   } catch (error) {
//     console.error(error);
//   }
// }

  return (
    <View style={styles.container}>
        <MapView
         
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}

          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          // region={this.state.region}
          showsUserLocation={true}
        >
        </MapView>

        <TextInput
          placeholder="  Enter destination..."
          style={styles.destinationInput}
          clearButtonMode= "always"
          value={destination}
         onChangeText={destination => setdestination(destination),
          onChangeDestinationDebounced(destination)
         }

        
        />
        {/* {predictions} */}
     </View>
  );
};


  export default RiderHome ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  destinationInput: {
    position: 'absolute',
    height: 40,
    width:"75%",
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    borderRadius: 10,

    backgroundColor: "white"
  },
  suggestions: {
    position: 'absolute',

    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5
  },
});




