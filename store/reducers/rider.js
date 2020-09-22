const initialState = {

    onlinedrivers: [],
  
  
  };
const rider  = (state = initialState, action) => {
    switch (action.type) {
     
      
           case "onlinedrivers":
             return {

                onlinedrivers : action.sreeraj
           }
         

   
   
       
    }
    return state;
}
export default rider;