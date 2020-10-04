const initialState = {

    onlinedrivers: [],
    googleDir:[],
    mylocationlatitude:0,
    mylocationlongitude:0,

    placeID:null
  
  
  };
const rider  = (state = initialState, action) => {
    switch (action.type) {
     
      
           case "onlinedrivers":
             return {

                onlinedrivers : action.sreeraj
           };

           case "googleres":
             return {

              googleDir : action.googledir
           }
           case "mylocationlatitude":
           return{
             ...state,
             mylocationlatitude: action.payload
           };
           case "mylocationlongitude":
            return{
              ...state,
              mylocationlatitude: action.payload
            };
         
           case "DirectionApI":
            return{
              ...state,
              placeID: action.payload
            };
          
   
   
       
    }
    return state;
}
export default rider;