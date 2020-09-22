import React, { useRef,useState } from 'react';
import { View, Text,FlatList, Alert,TouchableOpacity,StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import * as rider from '../../store/actions/rider';
import {useSelector,useDispatch} from 'react-redux';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

    const ModelSceen = ({navigation}) => {
      const [selectedId, setSelectedId] = useState(null);

      const dispatch = useDispatch();
      const {onlinedrivers} = useSelector((state) =>{
        return state.rider
        })
  const modalizeRef = useRef(null);
//   const modalizeRef = useRef<Modalize>(null);
// const renderItem = ({ item }) => (
//   <Item title={item.title} />
// );
const renderItem = ({ item }) => {
  const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

  return (
    <Item
      item={item}
      onPress={() => setSelectedId(item.id)}
      style={{ backgroundColor }}
    />
  );
};
  const onOpen = () => {
    modalizeRef.current?.open();
    const token01 = JSON.stringify( onlinedrivers);
     Alert.alert("Alert Shows After 5 Seconds of Delay.",token01)
  };

  const  logout=()=>{
    //  dispatch({type:"Token",payload:''})
      //  dispatch({type:"Userid",payload:""})
         
       //  dispatch(authActions.logout());
           // props.navigation.navigate('Auth');
         
     //Alert.alert(token01);
     dispatch(rider.getonlinedriver())

     setTimeout( async function(){
  
       //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      //  const driverOnline = await AsyncStorage.getItem('driverOnline');
      
      //  const transformedData = JSON.parse(driverOnline);
      //  const { onlinedriverID} = transformedData;
       const token01 = JSON.stringify( onlinedrivers);


   
       Alert.alert("Alert Shows After 5 Seconds of Delay.",token01)
   
     }, 5000);
   
   
     
   }
   
   return(
     <>
     <View style={styles.container}>
     <TouchableOpacity onPress={onOpen}>

         <Text style={{color: '#009387', marginTop:15,marginBottom: 15}}>onopensre</Text>
         </TouchableOpacity>
        
     </View>
     <Modalize ref={modalizeRef}
           handleStyle={{
                        marginTop:30,
                        backgroundColor:"#e9e9e9",
                        width:80
                    }}
                    modalStyle={{
                        borderTopLeftRadius:60,
                        borderTopRightRadius:60
                    }}
                    alwaysOpen={150}
                    scrollViewProps={{showsVerticalScrollIndicator:false}}>  
                    <View style={{marginTop:40,alignItems:"center"}}>
                    <TouchableOpacity onPress={logout}>

<Text style={{color: '#009387', marginTop:15,marginBottom: 15}}>hhh</Text>
</TouchableOpacity>
  <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
{/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
                    </View>       
</Modalize>
</>
   

 )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: 'gray',
      alignItems: 'center',
      
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  })
export default ModelSceen;