import React, {useState, useRef} from 'react';
import { widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import {Text,View,ScrollView,Dimensions,Image,PanResponder,TouchableOpacity,TextInput} from 'react-native';
import styles from './style';
import { useDispatch } from 'react-redux';
import { removeData, updateData } from '../../redux/features/counter/counterSlice';

const {width, height} = Dimensions.get('window'); //mobile height

const Items = ({ id, data, mobile }) => {
    const dispatch = useDispatch();
    const [updateTxt, setUpdateTxt] = useState("")
    const [show,setShow] = useState(false)
    const [mshow,setMshow] = useState(false)
    const [mob,setMobTxt] =useState("")

    const [showUpdate,setShowUpdate] = useState(false);
    const [showDelete,setShowDelete] =useState(false)
    
    const handleChange = (text) => {
        setUpdateTxt(text)
    }
    const handleMobileChange = (text) => {
        setMobTxt(text)
        console.log(mob)
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


    //position
  const [position, setPosition] = useState({x: 0}); // position of scrollbar
  const [toggle, settoggle] = useState(true); // avoid multiple function call of touch start and move
  const scrollViewRef = useRef();
  const [contentHeight, setContentHeight] = useState(0); // dynamic height of scrollview 
  const [percentage,setpercentage]=useState(0) 

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      
      if(gesture.moveX>220){
        setShowDelete(true)
        setShowUpdate(false)
        setPosition({
          x: 220,
          });
      }
      else if (gesture.moveX <= 10) {
        setShowDelete(false)
        setShowUpdate(true)
        setPosition({
        x: 1,
        });
      } else if (gesture.moveX <= hp('100%')-hp('20%')) {
        setShowDelete(false)
        setShowUpdate(false)
        setPosition({
          x: gesture.moveX,
        });
      }else{
        setShowDelete(false)
        setShowUpdate(false)
      }

    //   if(gesture.moveX>220){
    //     setShowDelete(true)
    //     setShowUpdate(false)
        
    //   }else{
    //     setShowDelete(false)
    //     setShowUpdate(false)
    //   }
      
     },
  });

  const handleTouch = event => {
    
    const {locationX, locationY} = event.nativeEvent;
    console.log(locationX)
    const t=hp('100%')-hp('20%');
    if(locationX>hp('100%')-hp('20%')){
        setPosition({x: hp('100%')-hp('20%')}); //setting bar position
     }else {
        setPosition({x: locationX}); //setting bar position
     }
     if(locationX>220){
        setShowDelete(true)
        setShowUpdate(false)
        setPosition({
          x: 220,
          });
      }else{
        setShowDelete(false)
        setShowUpdate(true)
      }
       
  };
  
  const handleScreenPress = event => {
    const t=hp('100%')-hp('20%'); //bar height
    const per1=((position.x/t)*100); // current position of gesture
    setpercentage(per1) //setting bar position
  };

  const hideDetail=()=>{
    setShow(false)
    setMshow(false)
  }
  return (
    <View style={{flex:1,marginVertical:30}}>
      

      <View
        style={{
          right: 0,
          top: 0,
          width: wp('100%'),
          
      
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
        }}
        
        onTouchMove={handleScreenPress}
        onTouchStart={()=>settoggle(true)}
        {...panResponder.panHandlers}
        >
        
        
        
        <TouchableOpacity
          style={{height: '100%', width: '100%'}}
          activeOpacity={1}
          
          onPress={handleTouch}
          
          >
          <View
          
            style={{
              
            
              width:hp("20%"),
              backgroundColor: 'white',
              borderRadius:20,
              transform: [
                {
                  translateX: position.x,
                },
              ],
            }}
            
  
        
            {...panResponder.panHandlers}
          >
             <Text style={styles.headerTxt}>Name -: { data}</Text>
          <Text style={styles.headerTxt}>Mobile -: { mobile}</Text>
          <TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          {showDelete &&  <TouchableOpacity onPress={()=>dispatch(removeData(id))}>
        <Image style={{height:50,width:50,objectFit:'fill',marginLeft:20}} source={require('../../Assets/Images/delete.png')} />
        </TouchableOpacity>}
         {showUpdate && <TouchableOpacity onPress={hideDetail} style={{marginHorizontal:23,borderRadius:10}}>
                
                <Image style={{height:30,width:30,marginHorizontal:10}} source={require('../../Assets/Images/visible.png')} />
            </TouchableOpacity>}
          {showUpdate && <TouchableOpacity onPress={()=>handleUpdate()}>
             <Image style={{height:50,width:20,objectFit:'fill',marginRight:15}} source={require('../../Assets/Images/refresh.png')} /> 
        </TouchableOpacity>}
          </View>
            

          </TouchableOpacity>
          

          {show && 
             <TextInput placeholder='Enter name' onSubmitEditing={handleUpdate} onChangeText={handleChange} style={styles.inputBox} value={updateTxt} />
          }
         {
            mshow &&  <TextInput keyboardType = 'numeric' placeholder='Enter Phone number' onSubmitEditing={handleUpdate} onChangeText={handleMobileChange} style={styles.inputBox} value={mob} />
         }
         
          </View>
          
        </TouchableOpacity>
        
        
        
        
      </View>
    </View>
  );
};

export default Items;