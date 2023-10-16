import { useState } from 'react';
import {  TouchableOpacity,View ,Text,Image,TextInput } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { removeData, updateData } from '../../redux/features/counter/counterSlice';
import styles from './style';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';




const END_POSITION = 5;

export default function Items({ id, data, mobile }) {
  //logic
  const dispatch = useDispatch();
  const [updateTxt, setUpdateTxt] = useState("")
  const [show,setShow] = useState(false)
  const [mshow,setMshow] = useState(false)
  const [mob,setMobTxt] =useState("")
  
  const handleChange = (text) => {
      setUpdateTxt(text)
  }
  const handleMobileChange = (text) => {
      setMobTxt(text)
  }
  const handleUpdate = () => {
      if (mob.trim().length > 0) {
          let temp1=id+"#$"+mob.trim()+"#$mobile"
          dispatch(updateData(temp1))   
      }
      if (updateTxt.trim().length > 0) {
          let temp=id+"#$"+updateTxt.trim()+"#$name"
          dispatch(updateData(temp)) 
      }
      setUpdateTxt("")
      setMobTxt("")
      setShow(!show)
      setMshow(!mshow)
      
  }
  //logic
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const [val,setVal] =useState(false)

  const handleDel=()=>{
    dispatch(removeData(id))
  }
  const hideDetail=()=>{
    setShow(false)
    setMshow(false)
  }


  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onLeft.value = false;
        runOnJS(hideDetail)()
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
      }
  
    })
    .onTouchesUp((e)=>{
      if (position.value >150) {
        runOnJS(handleDel)()
      }else if(position.value < -181){
        runOnJS(handleUpdate)()
      } 
    })
    
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

 
  Gesture.Exclusive(panGesture)

  return (
    <GestureHandlerRootView>
          <View  style={{width:'100%',backgroundColor:"green",marginVertical:20}}>
          <Image style={{height:50,width:30,position:'absolute',objectFit:'fill',marginVertical:35}} source={require('../../Assets/Images/del.png')} />
          
          <Image style={{height:50,width:30,position:'absolute',objectFit:'fill',marginVertical:35,marginLeft:350}} source={require('../../Assets/Images/ref.png')} />
          <GestureDetector gesture={panGesture} >
          
            <Animated.View  style={[styles.container, animatedStyle]} >
            <Text style={styles.headerTxt}>Name -: { data}</Text>
          <Text style={styles.headerTxt}>Mobile -: { mobile}</Text>
          <TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          {val &&  <TouchableOpacity onPress={()=>dispatch(removeData(id))}>
        <Image style={{height:0,width:50,objectFit:'fill',marginLeft:20}} source={require('../../Assets/Images/delete.png')} />
        </TouchableOpacity>}
         {!val && <TouchableOpacity onPress={hideDetail} style={{marginHorizontal:23,borderRadius:10}}>
                
                <Image style={{height:30,width:30,marginHorizontal:10}} source={require('../../Assets/Images/visible.png')} />
            </TouchableOpacity>}
          {!val && <TouchableOpacity onPress={()=>handleUpdate()}>
             <Image style={{height:0,width:20,objectFit:'fill',marginRight:15}} source={require('../../Assets/Images/refresh.png')} /> 
        </TouchableOpacity>}
          </View>
          </TouchableOpacity>
          {show && !val &&
             <TextInput placeholder='Enter name' onSubmitEditing={handleUpdate} onChangeText={handleChange} style={styles.inputBox} value={updateTxt} />
          }
         {
            mshow && !val &&  <TextInput keyboardType = 'numeric' placeholder='Enter Phone number' onSubmitEditing={handleUpdate} onChangeText={handleMobileChange} style={styles.inputBox} value={mob} />
         }
            </Animated.View>
            </GestureDetector>
          </View> 
    </GestureHandlerRootView>
  );
}
