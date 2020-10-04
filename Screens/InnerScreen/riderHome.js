import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, Keyboard,View,ScrollView,Input,Dimensions ,TextInput,ActivityIndicator,TouchableHighlight,Alert } from 'react-native';
import MapView , { Polyline, Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import _ from "lodash";
import Colors from '../../constants/color';
import apiKey from "./google_api_key";
import { TouchableOpacity } from 'react-native-gesture-handler';
import color from '../../constants/color';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const RiderHome = ({navigation}) => {
  const [longitude , setlongitude] = useState(0);
  const [latitude, setlatitude] = useState(0);
  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [booking,setbooking ] =useState(false);
  // const onChangeDestinationDebounced = useCallback(_.debounce(onChangeDestination, 1000), []);
  const onChangeDestinationDebounced = _.debounce(onChangeDestination,1000); 
  const [destination, setdestination] = useState(""); 
  const [predictions, setpredictions] = useState([]); 
  //  let onChangeDestinationDebounced = null;
  //  if (!destination){
  //   onChangeDestinationDebounced = _.debounce(onChangeDestination,1000);
  //  }
//   const onChangeDestinationDebounced = (event) => {
//     // perform any event related action here

//     handler();
//  };
  useEffect(() => {
    async function cureentlocations() {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
    try{
      let appcurrentlocation = await Location.getCurrentPositionAsync({});
      // dispatch({type:"ADD_Location",payload:location})
      setlocation(appcurrentlocation)
      setlatitude(appcurrentlocation.coords.latitude);
      setlongitude (appcurrentlocation.coords.longitude);
      console.log(location,"sreeraj")
    }
    catch (err) {
      console.error(err);
    }
     
          
    }
  
   
    cureentlocations()
    const text = JSON.stringify(location);
  
    console.log(text,"wait..")
    

    // if (location===null){
    //   cureentlocation()
    //   cureentlocation()
    //   const text = JSON.stringify(location);
    
    //   console.log(text,"test..")
    // }
  }, [])



// async function onChangeDestination (destination) {
//   Alert.alert(destination)

//   console.log(location.coords.latitude, 'nullll',destination);
  // const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
  // &input=${destination}&location=${latitude},${
  //   longitude
  // }&radius=2000`;
//   console.log(apiUrl);
//   try {
//     const result = await fetch(apiUrl);
//     const json = await result.json();
//   //  setpredictions(JSON.stringify(json.predictions))
//     const text = JSON.stringify(json.predictions);
//     Alert.alert(text)
//     // this.setState({
//     //   predictions: json.predictions
//     // });
//     console.log(text);
//     Alert.alert(text)
//   } catch (err) {
//     console.error(err);
//   }
// }


async function onChangeDestination (destination) {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
  &input=${destination}&location=${latitude},${
    longitude
  }&radius=2000`;
  console.log('test',destination,apiUrl)
  try {
    const result = await fetch(apiUrl);
    const json = await result.json();
    setpredictions(json.predictions)
   
  } catch (err) {
    console.error(err);
  }
}


  const test= predictions.map(prediction => (
    <TouchableOpacity
    // onPress={() => Alert.alert('ttt' , prediction.structured_formatting.main_text)}

      onPress={() =>
        getRouteDirections(
          prediction.place_id,
          prediction.structured_formatting.main_text
        )
     }
      key={prediction.id}
    >
      <View>
        <Text style={styles.suggestions}>
          {prediction.structured_formatting.main_text}
        </Text>
      </View>
    </TouchableOpacity>
  ));


async function getRouteDirections(destinationPlaceId, destinationName) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${
      latitude
      },${
      longitude
      }&destination=place_id:${destinationPlaceId}&key=${apiKey}`
    );
    const json = await response.json();
    console.log(json);
    const token01 = JSON.stringify( json);
    Alert.alert("Alert Shows After 5 Seconds of Delay.",token01)
  //  const points = PolyLine.decode(json.routes[0].overview_polyline.points);
  //   const pointCoords = points.map(point => {
  //    return { latitude: point[0], longitude: point[1] };
  //   });
setpredictions([]);
setdestination(destinationName);
setbooking(true);

    // this.setState({
    //   pointCoords,
    //   predictions: [],
    //   destination: destinationName,
    //   routeResponse: json,
    // });
    Keyboard.dismiss();
   // this.map.fitToCoordinates(pointCoords);
  } catch (error) {
    console.error(error);
  }
}
if(location === null){
  return(
    <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
          <ActivityIndicator size="large" color={Colors.primary} />


    </View>
  )
}
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: Colors.hoonowhite,
        opacity:0.4
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: Colors.hoonoblack
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: Colors.primary }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  // ...
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#3e73fd"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: Colors.hoonoblack
      }
    ]
  }
];

  return (
    
    <View style={styles.container}>
        <MapView
         
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}

          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          showsUserLocation={true}
        >
        </MapView>
       
       
        {!booking ? ( <TextInput
          placeholder="Enter destination..."
          style={styles.destinationInput}
          value={destination}
          clearButtonMode="always"
          onChangeText={destination => {
            setdestination(destination);
          onChangeDestinationDebounced(destination);
          }}
        />):null}
           {test}
           {booking ? ( <View style={{position:'absolute', width:'85%',bottom:30,marginHorizontal:30,marginVertical:10,alignContent:'center',justifyContent:'center'}}>
      <TouchableOpacity style={{backgroundColor:Colors.primary,paddingHorizontal:14,height:45,borderRadius:30,alignContent:'center',justifyContent:'center'}}
      onPress={setbooking(true)}>
      <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:25}}>Book Your Ride</Text>
</TouchableOpacity>
     </View>):null}
     </View>
  );
};


  export default RiderHome ;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  suggestions: {

    backgroundColor: "white",
    width:"80%",

    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    paddingLeft:15,

  },
  destinationInput: {
    width:"80%",
    height: 50,
    borderWidth: 0.5,
    marginTop: 90,
    borderTopLeftRadius:25,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    paddingLeft:15,
    backgroundColor: "white"
  },
  
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   paddingHorizontal: 0.10 * SCREEN_WIDTH
  // },
  
});




