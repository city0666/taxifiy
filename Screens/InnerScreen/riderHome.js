import React,{useState,useEffect,useCallback,useRef} from 'react';
import { StyleSheet, Text, Keyboard,View,Dimensions ,TextInput,ActivityIndicator,SafeAreaView,TouchableHighlight,Alert } from 'react-native';
import MapView , { Polyline, Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
//  import * as Permissions from 'expo-permissions';

import _ from "lodash";
import Colors from '../../constants/color';
import GOOGLE_API_KEY from "./google_api_key";
import * as rider from '../../store/actions/rider';
import {useSelector,useDispatch} from 'react-redux';
import PolyLine from "@mapbox/polyline";
// import mapStyle from './mapStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { array } from 'yup';
// import { cos } from 'react-native-reanimated';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const RiderHome = ({navigation}) => {
  let marker = null;
  neardriver = null;
  // let map = null;

  const mapRef = useRef('');

  const [longitude , setlongitude] = useState(0);
  const [latitude, setlatitude] = useState(0);
  const [location, setlocation] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [booking,setbooking ] =useState(false);
  const [pointCoords , setpointCoords] = useState([]);
  const onChangeDestinationDebounced = _.debounce(onChangeDestination,1000); 
  const [destination, setdestination] = useState(""); 
  const [predictions, setpredictions] = useState([]); 
  const [test01, settest] = useState([]);
  const [namedir ,setnamedir ] = useState('');
  const dispatch = useDispatch();
  const [ sreemarkers, setSeeMarker]= useState([
    {
      coordinate: {
        latitude: 9.909824,
        longitude: 37.785834,
      },
      title: "Best Place",
      description: "This is the best place in Portland",
    },
    {
      coordinate: {
        latitude: 9.3098238,
        longitude: 76.6052032,
      },
      title: "Second Best Place",
      description: "This is the second best place in Portland",
    },
    {
      coordinate: {
        latitude: 45.5230786,
        longitude: -122.6701034,
      },
      title: "Third Best Place",
      description: "This is the third best place in Portland",
    },
    {
      coordinate: {
        latitude: 45.521016,
        longitude: -122.6561917,
      },
      title: "Fourth Best Place",
      description: "This is the fourth best place in Portland",
    },
  ])
  
  const {  mylocationlatitude,
    mylocationlongitude, placeID,googledir,onlinedrivers} = useSelector((state) =>{
    return state.rider
    })
  //  neardriver = JSON.stringify(onlinedrivers);
  useEffect(() => {
    
    async function cureentlocations() {
    //  let { status } = await Location.requestPermissionsAsync(Permissions.LOCATION);
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
      
      // dispatch({type:'mylocationlatitude', payload : appcurrentlocation.coords.latitude});
      // dispatch({type:'mylocationlongitude', payload : appcurrentlocation.coords.longitude})

    }
    catch (err) {
      console.error(err);
    }
     
console.log('test : ' ,latitude)
         
    }
  
   
    cureentlocations()
 

    
  }, [])



async function onChangeDestination (destination) {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}
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



  const test= predictions.map((prediction,index) => (
    <TouchableOpacity
    // onPress={() => Alert.alert('ttt' , prediction.structured_formatting.main_text)}

      onPress={() =>
        getRouteDirections(
          prediction.place_id,
          prediction.structured_formatting.main_text )}
      key={ prediction.id,index }
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
      }&destination=place_id:${destinationPlaceId}&key=${GOOGLE_API_KEY}`
    );
    const json = await response.json();
    Keyboard.dismiss();

    const points = PolyLine.decode(json.routes[0].overview_polyline.points);
    let coords = points.map((point) => {
      return  {
          latitude : point[0],
          longitude : point[1]
      }
  })

setpointCoords(coords)
setdestination(destinationName);
setnamedir(destinationName)
setpredictions([]);

setbooking(true);
setlocation(json);

   
    
console.log(pointCoords)
  console.log(json.routes[0].legs[0].distance.text,"sreeraj")
 // this.map.fitToCoordinates(pointCoords);
// map.fitToCoordinates(pointCoords)
    const token01 = JSON.stringify(json.routes[0].legs[0].duration.text  );
    settest(token01);
    setErrorMsg(json.routes[0].legs[0].distance.text)
   // Alert.alert(token01)

  } catch (error) {
    console.error(error);
  }
  //mapRef.fitToCoordinates(pointCoords);
  //setTimeout( () => {  mapRef.current.fitToCoordinates(pointCoords,{ edgePadding: { top: 120, right: 120, bottom: 120, left: 120 }, animated: false }); }, 2000 );
 // bookyourride();
//   console.log( 'testt',pointCoords[0]);

//  // mapRef.current.fitToCoordinates(pointCoords);
// if(pointCoords[0])
// {
//   console.log('tes',pointCoords[1])
//   setTimeout( () => {  mapRef.current.fitToCoordinates(pointCoords,{ edgePadding: { top: 120, right: 120, bottom: 120, left: 120 }, animated: false }); }, 2000 );

// }
bookyourride (pointCoords);

}
// const polylinegoogledri = () =>{¸
// console.log(location);

const bookyourride = (pointCoords) =>{
  console.log( 'testt',pointCoords[0]);

 // mapRef.current.fitToCoordinates(pointCoords);
 if(pointCoords[0]=== undefined){
  const token01 = JSON.stringify( pointCoords);

Alert.alert("pointCoords",token01)

 }
else if(pointCoords[0])
{
  console.log('tes',pointCoords[1])
  setTimeout( () => {  mapRef.current.fitToCoordinates(pointCoords,{ edgePadding: { top: 120, right: 120, bottom: 120, left: 120 }, animated: false }); }, 2000 );

}
// setTimeout( () => {  mapRef.current.fitToCoordinates(pointCoords,{ edgePadding: { top: 120, right: 120, bottom: 120, left: 120 }, animated: false }); }, 2000 );
}

 const findrider=()=>{
  //const token01 = JSON.stringify( pointCoords);

  //Alert.alert("pointCoords",token01)
  setTimeout( () => {  mapRef.current.fitToCoordinates(pointCoords,{ edgePadding: { top: 120, right: 120, bottom: 120, left: 120 }, animated: false }); }, 2000 );

  dispatch(rider.getonlinedriver())
  const sree = onlinedrivers.driverlocation
  // console.log(onlinedrivers.driverlocation)
  const token01 = JSON.stringify( sree);

  onlinedrivers.map((marker, index) => {
  const token01 = JSON.stringify( marker.driverlocation.coordinates);
Alert.alert(token01)
  console.log("sss",marker.driverlocation.coordinates)
  
  
})
}


    if (pointCoords.length > 1) {
      marker = (
      //   <Marker
      //     coordinate={pointCoords[pointCoords.length - 1]}
      //   title={test01}
      //   description={ errorMsg}
      
      // image={require('../../assets/pin100.png')}
      //   >
      <Marker coordinate={pointCoords[pointCoords.length - 1]}>
        <View style={{flexDirection:'row',  padding: 5,
    borderRadius: 5,backgroundColor:'#000',alignContent:"center"}}>

         <View style={styles.marker}>
      <Text style={styles.text}>{test01}</Text>
      <Text style={styles.text}>{errorMsg} </Text>

            </View>
            <View style={{ padding:15}}>
            <Text style={styles.text}>{namedir} </Text>
            </View>
            </View>
      </Marker>
      );
      // driverbutton =(
      // <TouchableOpacity style={styles.bottomButton}
      // onPress={() => this.requestDriver()}> 
       
      //   <Text style={styles.bottomButtonText}>Find Driver</Text>
       
      //   </TouchableOpacity>);
    }
if(latitude === 0){
  console.log(latitude,'development');
  return(
    <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
          <ActivityIndicator size="large" color={Colors.primary} />

    </View>
  )
}
// else if (latitude != 0){
//   console.log(latitude,'0!');

//}

  return (
    // <SafeAreaView style={{flex: 1}}>

    <View style={styles.container}>
        <MapView
            ref={ mapRef}
            
          style={styles.map}
          provider={PROVIDER_GOOGLE}
        // customMapStyle={mapStyle}
        //  onLayout={()=>{
        //   mapRef.current.fitToCoordinates(pointCoords)
        // }}
       // onLayout = {() => { setTimeout( () => {  mapRef.current.fitToCoordinates(pointCoords,{ edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false }); }, 2000 ); }}

          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta:  0.05,
            longitudeDelta: 0.05 * (SCREEN_WIDTH / SCREEN_HEIGHT),
            statusBarHeight: 0,
          }}
         
          showsUserLocation={true}
        >
{onlinedrivers.map((host, i) => {
        if (host.driverlocation.coordinates[0] && host.driverlocation.coordinates[1]) {
          console.log("TEST", host.driverlocation.coordinates[1]);
         return(<Marker
            key={i}
            coordinate={{
              latitude:  host.driverlocation.coordinates[0],
              longitude:  host.driverlocation.coordinates[1]
            }}
            title={"host.name"}
            pinColor={"#ffd1dc"}
          />)
        }
      })}


           <Polyline
            coordinates={pointCoords}
            strokeWidth={4}
            strokeColor= {Colors.hoono}
          />
          {marker}
         
{/* {neardriver} */}

{/* {sreemarkers.map((marker, index) => {
  //console.log(sreemarkers,'ssssslove')
            return (
             <MapView.Marker key={index} coordinate={marker.coordinate}
             image={require('../../assets/pin100.png')}
             >
              </MapView.Marker>
            );
          })} */}

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
      <TouchableHighlight style={{backgroundColor:Colors.primary,paddingHorizontal:14,height:45,borderRadius:30,alignContent:'center',justifyContent:'center'}}
    onPress={findrider} >
      <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:25}}>Book Your Ride</Text>
</TouchableHighlight>
     </View>):null}
     </View>
    //  </SafeAreaView>

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
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
    alignItems:'center'
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   paddingHorizontal: 0.10 * SCREEN_WIDTH
  // },
  
});




