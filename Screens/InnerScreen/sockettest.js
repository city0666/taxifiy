import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useCallback,useRef } from 'react';
import { StyleSheet, Text, View,ScrollView,Input,Dimensions ,TextInput,ActivityIndicator,TouchableHighlight } from 'react-native';
import io from "socket.io-client";
import {useSelector,useDispatch} from 'react-redux';


const Sockettest = ({navigation}) => {


    const [messageToSend, setMessageToSend] = useState("");
    const [recvMessages, setRecvMessages] = useState([]);
    const[test01, settest] = useState('');
    const socket = useRef(null);
    const dispatch = useDispatch();

 
    const {userId,name,email} = useSelector((state) =>{
    return state.auth
    })
    
  let test ="5f0616a9da53963b9851d1f6";
  if (userId === test){
    test ="5ec6a29719311735b45c26d0"
  }
  const sree = {room1:userId, room2:test}
    useEffect(() => {
      socket.current = io("http://192.168.225.22:8080");
      
     
      
      socket.current.on("join", join => {
        setRecvMessages(prevState => [...prevState, join]);
        settest(join)
      });
      socket.current.emit("join", userId  );

      
    }, []);
  
    const sendMessage = () => {
      socket.current.emit("message", {
        text:messageToSend,
        sender: userId,
        room: test
      });
      setMessageToSend("");
      socket.current.on("testmessage", testmessage => {
          setRecvMessages(prevState => [...prevState, testmessage.text]);
         // settest(testmessage.text)
        console.log(testmessage.text)
        });
    };
  
    const textOfRecvMessages = recvMessages.map(msg => (
      <Text key={msg}>{msg}</Text>
    ));
  
    return (
      <View style={styles.container}>
        <TextInput style={{margin:100,backgroundColor:'red'}}
          value={messageToSend}
          onChangeText={text => setMessageToSend(text)}
          placeholder="Enter chat messsage.."
          onSubmitEditing={sendMessage}
        />
                {textOfRecvMessages}

                <Text>{test01}</Text>

      </View>
    );
}




 export default Sockettest ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },})