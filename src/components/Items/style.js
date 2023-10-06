import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container:{width:'90%',backgroundColor:'white',marginVertical:20,marginHorizontal:19,borderRadius:20},
    headerTxt: { marginVertical: 10, marginHorizontal: 24, fontSize: 20, fontWeight: 'bold' },
    inputBox:{borderWidth:1,marginHorizontal:23,borderRadius:10},
    btnFlex: { flexDirection: 'row', marginHorizontal: 13, justifyContent: 'space-around', marginVertical: 10 },
    delBtn: { backgroundColor: '#FF0000', width: '45%', height: 'auto', borderRadius: 8 },
    delTxt: { color: 'white', textAlign: 'center', fontSize: 20, fontWeight: "bold", paddingVertical: 5 },
    updButton: { backgroundColor: '#8B8000', width: '45%', height: 'auto', borderRadius: 8 },
    updText: {color:'white',textAlign:'center',fontSize:20,fontWeight:"bold",paddingVertical:5}
});
  
export default styles;