import React,{useEffect, useState} from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';
 

import { adddata,removeData,
  updateData,
  incrementAsync,
  selectCount, } from '../../redux/features/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Dashboard from '../Dashboard/Dashboard';
import styles from './style';
import { SCREEN, STRING } from '../../constants/Strings';

const AddItem = () => {
  const navigation=useNavigation()
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [inpText, setInpText] = useState("");
  const handlechange = (text) => {
    setInpText(text)
  }
  const handleAdd = () => {
    if (inpText.trim().length > 0) {
      dispatch(adddata(inpText))
      Alert.alert(STRING.ITEM_SUCCESS)
    }else{
      Alert.alert(STRING.ITEM_FAIL)
    }
    setInpText("")
  }
  const handleNavigate = () => {
    navigation.navigate("Dashboard")
  }
      return (
    
        <ScrollView >
       
            <Image style={styles.headerImg} source={require('../../Assets/Images/speak.png')}  />
            
            <View style={styles.box}>
            <View style={{}}>
              <Text style={styles.headerText} >Add Item</Text>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder='Enter Description'
                  onChangeText={handlechange}
                  value={inpText}
                />
                
              </View>
            </View>
            <TouchableOpacity
            style={styles.btnStyle}
              activeOpacity={0.7}
                  onPress={handleAdd} 
            >
            
              <Text style={styles.btnText} >Add new item</Text>
            </TouchableOpacity>
            
            
           
          </View>
          <Dashboard/>
          </ScrollView>
       
      );
};
    
export default AddItem