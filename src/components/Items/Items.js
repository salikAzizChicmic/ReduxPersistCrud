import React, { useState,useEffect } from 'react'
import { View,Text, TouchableOpacity, TextInput, Alert, ScrollView, Image } from 'react-native'
import { useDispatch } from 'react-redux';
import { removeData, updateData } from '../../redux/features/counter/counterSlice';
import styles from './style';
import { useSwipe } from './SwipeGesture/useSwipe';

const Items = ({ id, data, mobile }) => {
    
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


   

    //touch movement

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

    function onSwipeLeft(){
        console.log('SWIPE_LEFT')
        dispatch(removeData(id))
    }

    function onSwipeRight(){
        console.log('SWIPE_RIGHT')
        handleUpdate()
        
    }
  return (
    <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <View style={styles.container}>
          <Text style={styles.headerTxt}>Name -: { data}</Text>
          <Text style={styles.headerTxt}>Mobile -: { mobile}</Text>
          <TouchableOpacity>
            <View style={{flexDirection:'row',backgroundColor:'orange',marginHorizontal:23,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:25,fontWeight:'bold'}}>Hide</Text>
                <Image style={{height:30,width:30,marginHorizontal:10}} source={require('../../Assets/Images/visible.png')} />
            </View>

          </TouchableOpacity>

          {show && 
             <TextInput placeholder='Enter name' onSubmitEditing={handleUpdate} onChangeText={handleChange} style={styles.inputBox} value={updateTxt} />
          }
         {
            mshow &&  <TextInput keyboardType = 'numeric' placeholder='Enter Phone number' onSubmitEditing={handleUpdate} onChangeText={handleMobileChange} style={styles.inputBox} value={mob} />
         }
        
         
           
      </View>
      </ScrollView>
      
  )
}

export default Items