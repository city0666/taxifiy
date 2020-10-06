import Colors from '../../constants/color';
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
         // color: Colors.testcolor
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

  export default mapStyle;