import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";
import MapView, { Polyline, Marker ,PROVIDER_GOOGLE} from "react-native-maps";
import apiKey from "./google_api_key";
import _ from "lodash";
import PolyLine from "@mapbox/polyline";
// import socketIO from "socket.io-client";

export default class test extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      destination: "",
      predictions: [],
      pointCoords: [],
      lookingForDriver: false,
      driverIsOnTheWay: false,
      markers: [
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Best Place",
          description: "This is the best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
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
      ],
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };
    
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000
    );
  }
    
  
  componentDidMount() {
    //Get current location and set initial region to this
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,

        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );
  }

  async getRouteDirections(destinationPlaceId, destinationName) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          this.state.latitude
        },${
          this.state.longitude
        }&destination=place_id:${destinationPlaceId}&key=${apiKey}`
      );
      const json = await response.json();
      console.log(json);
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      const pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({
        pointCoords,
        predictions: [],
        destination: destinationName,
        routeResponse: json,
      });
      Keyboard.dismiss();
      this.map.fitToCoordinates(pointCoords);
    } catch (error) {
      console.error(error);
    }
  }

  async onChangeDestination(destination) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
    &input=${destination}&location=${this.state.latitude},${
      this.state.longitude
    }&radius=2000`;
    console.log(apiUrl);
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        predictions: json.predictions
      });
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  }
 // http://54.87.154.240:8080
//   async requestDriver(){

//    //const socket = socketIO.connect("http://192.168.225.22:8080")
//     const socket = socketIO.connect("http://54.87.154.240:8080")

//    socket.on("connect", () => {
//      socket.emit("taxiRequest", this.state.routeResponse)

//     console.log('client connected');
//    })
//    socket.on("driverLocation", driverLocation => {
//      let pointCoords = this.state.pointCoords;
//      pointCoords.push(driverLocation)
//      this.map.fitToCoordinates(pointCoords, {edgepadding:{top:20,left:20,right:20}})
//    console.log(driverLocation)
//    console.log('libin kitty')
//    this.setState({
//     lookingForDriver: false,
//     driverIsOnTheWay: true,
//     driverLocation
//   });

//   });
    
//   }

  render() {
    let marker = null;
    let driverbutton = null;
    let driverMarker = null;


    if (this.state.driverIsOnTheWay) {
      driverMarker = (
        <Marker coordinate={this.state.driverLocation}>
          <Image
            source={require("../../assets/images/car.png")}
            style={{ width: 40, height: 40 }}
          />
        </Marker>
      );
    }


    if (this.state.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
          title={"destination"}
      description={"location"}
      image={require('../../assets/pin100.png')}
        />
      );
      driverbutton =(
      <TouchableOpacity style={styles.bottomButton}
      onPress={() => this.requestDriver()}> 
       
        <Text style={styles.bottomButtonText}>Find Driver</Text>
       
        </TouchableOpacity>);
    }

    const predictions = this.state.predictions.map(prediction => (
      <TouchableHighlight
        onPress={() =>
          this.getRouteDirections(
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
      </TouchableHighlight>
    ));


    // if (this.state.latitude == 0){
    //   return(
    //     <View style={styles.waiting}>
    //     <Text style={{ justifyContent:"center",alignItems:"center"}}>waiting for location....</Text>
    //   </View>
    // );
    // }

    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          
          style={styles.map}
          provider={PROVIDER_GOOGLE}

          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          // region={this.state.region}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={this.state.pointCoords}
            strokeWidth={4}
            strokeColor="#7c2b83"
          />
          {marker}
          {driverMarker}

          {this.state.markers.map((marker, index) => {
            return (
             <MapView.Marker key={index} coordinate={marker.coordinate}
             image={require('../../assets/pin100.png')}
             >
              </MapView.Marker>
            );
          })}

        </MapView>
        <TextInput
          placeholder="Enter destination..."
          style={styles.destinationInput}
          value={this.state.destination}
          clearButtonMode="always"
          onChangeText={destination => {
            console.log(destination);
            this.setState({ destination });
            this.onChangeDestinationDebounced(destination);
          }}
        />
        {predictions}
        {/* {driverbutton} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: "black",
    marginTop:"auto",
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center"
  },
  bottomButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600"
  },
  suggestions: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 15,
    marginRight: 55
  },
  destinationInput: {
    height: 50,
    borderWidth: 0.5,
    marginTop: 55,
    borderTopLeftRadius:25,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    paddingLeft:15,
    backgroundColor: "white"
  },
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  waiting: {
    justifyContent: "center",
    alignItems: "center",
    flex:1
  }
});