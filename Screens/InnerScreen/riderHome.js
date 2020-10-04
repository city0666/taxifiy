import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, Keyboard,View,ScrollView,Input,Dimensions ,TextInput,ActivityIndicator,TouchableHighlight,Alert } from 'react-native';
import MapView , { Polyline, Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import _ from "lodash";
import Colors from '../../constants/color';
import apiKey from "./google_api_key";
import * as rider from '../../store/actions/rider';
import {useSelector,useDispatch} from 'react-redux';

import { TouchableOpacity } from 'react-native-gesture-handler';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const RiderHome = ({navigation}) => {
  const [longitude , setlongitude] = useState(0);
  const [latitude, setlatitude] = useState(0);
  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [booking,setbooking ] =useState(false);
  const [pointCoords , setpointCoords] = useState([]);
  const onChangeDestinationDebounced = _.debounce(onChangeDestination,1000); 
  const [destination, setdestination] = useState(""); 
  const [predictions, setpredictions] = useState([]); 
  const dispatch = useDispatch();
  
  const {  mylocationlatitude,
    mylocationlongitude, placeID,googledir} = useSelector((state) =>{
    return state.rider
    })
  useEffect(() => {
    async function cureentlocations() {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
    try{
      let appcurrentlocation = await Location.getCurrentPositionAsync({});
      // dispatch({type:"ADD_Location",payload:location})
      //setlocation(appcurrentlocation)
      setlatitude(appcurrentlocation.coords.latitude);
      setlongitude (appcurrentlocation.coords.longitude);
      dispatch({type:'mylocationlatitude', payload : appcurrentlocation.coords.latitude});
      dispatch({type:'mylocationlongitude', payload : appcurrentlocation.coords.longitude})

    }
    catch (err) {
      console.error(err);
    }
     

         
    }
  
   
    cureentlocations()
  
  //   let points = Polyline.decode(googledir.routes[0].overview_polyline.points);
  //   let coords = points.map((point, index) => {
  //     return  {
  //         latitude : point[0],
  //         longitude : point[1]
  //     }
  // })
  // setpointCoords(coords);
    

  }, [])
if (googledir != null)
{
  Alert.alert(googledir)
}





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
          prediction.structured_formatting.main_text )}
      key={prediction.id}
    >
      <View>
        <Text style={styles.suggestions}>
          {prediction.structured_formatting.main_text}
        </Text>
      </View>
    </TouchableOpacity>
  ));


  async function getRouteDirections      (destinationPlaceId = prediction.place_id, destinationName) {
  dispatch({type:'DirectionApI', payload : destinationPlaceId})

//Alert.alert(placeID,'sss',destinationPlaceId,'ggg',destinationName)

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${
      latitude
      },${
      longitude
      }&destination=place_id:${destinationPlaceId}&key=${apiKey}`
    );
    const json = await response.json();
   
    
setpredictions([]);
setdestination(destinationName);
setbooking(true);
   const token01 = JSON.stringify( mylocationlatitude);

     Alert.alert(placeID,destinationPlaceId)
setlocation(json);

   
    Keyboard.dismiss();
  } catch (error) {
    console.error(error);
  }

 dispatch(rider.getdirectionfromgoogle(  placeID,mylocationlongitude,mylocationlatitude));
 polylinegoogledri();

}
polylinegoogledri =() =>{

  let points = Polyline.decode(json.routes[0].overview_polyline.points);
   
    let coords = points.map((point, index) => {
      return  {
          latitude : point[0],
          longitude : point[1]
      }
  })
setpointCoords(coords)
map.fitToCoordinates(pointCoords);

}

 // this.setState({
    //   pointCoords,
    //   predictions: [],
    //   destination: destinationName,
    //   routeResponse: json,
    // });
if(latitude === null){
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
        color: Colors.hoonoblack,
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
    stylers: [{ color: Colors.hoono }],
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
           <Polyline
            coordinates={pointCoords}
            strokeWidth={4}
            strokeColor="#7c2b83"
          />
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
        />):(<TextInput
          placeholder="Enter destination..."
          style={styles.destinationInput}
          value={destination}
          clearButtonMode="always"
          onChangeText={destination => {
            setdestination(destination);
          onChangeDestinationDebounced(destination);
          }}
        />)}
           {test}
           {booking ? ( <View style={{position:'absolute', width:'85%',bottom:30,marginHorizontal:30,marginVertical:10,alignContent:'center',justifyContent:'center'}}>
      <TouchableOpacity style={{backgroundColor:Colors.primary,paddingHorizontal:14,height:45,borderRadius:30,alignContent:'center',justifyContent:'center'}}
      >
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

    backgroundColor: Colors.hoono,
    width:"80%",

    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    alignSelf:'center',

    padding: 5,
    paddingLeft:30,

  },
  destinationInput: {
    width:"80%",
    height: 50,
    borderWidth: 0.5,
    marginTop: 90,
    borderTopLeftRadius:25,
    
    paddingLeft: 30,
    alignSelf:'center',
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




