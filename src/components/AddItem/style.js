import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  headerImg: { height: 120, width: 120, marginTop: 30, marginLeft: '30%' },
  box: { backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, borderRadius: 10, marginVertical: 10 },
  headerText: { fontSize: 25, fontWeight: 'bold', marginLeft: 70, marginVertical: 10 },
  inputBox: { borderWidth: 1, borderColor: 'lightgrey', width: 250, borderRadius: 10 ,marginVertical:10},
  btnStyle: { backgroundColor: "#009193", marginTop: 10, marginBottom: 20, borderRadius: 10 },
  btnText: {fontWeight:'bold',color:'white',fontSize:23,paddingVertical:10,paddingHorizontal:55}
});
  
export default styles;