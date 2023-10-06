import React, { useState } from 'react'
import { View,Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useDispatch } from 'react-redux';
import { removeData, updateData } from '../../redux/features/counter/counterSlice';
import styles from './style';

const Items = ({ id, data }) => {
    const dispatch = useDispatch();
    const [updateTxt, setUpdateTxt] = useState("")
    const [show,setShow] = useState(false)
    
    const handleChange = (text) => {
        setUpdateTxt(text)
    }
    const handleUpdate = () => {
        if (updateTxt.trim().length > 0) {
            let temp=id+" "+updateTxt.trim()
            dispatch(updateData(temp))
        }
        setUpdateTxt("")
        setShow(!show)
    }
  return (
      <View style={styles.container}>
          <Text style={styles.headerTxt}>{ data}</Text>
          {show && <TextInput onChangeText={handleChange} style={styles.inputBox} value={updateTxt} />}
          <View style={styles.btnFlex}>
              <TouchableOpacity onPress={()=>dispatch(removeData(id))} style={styles.delBtn}>
                  <Text style={styles.delTxt}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdate} style={styles.updButton}>
                  <Text style={styles.updText}>Update</Text>
              </TouchableOpacity>
          </View>
      </View>
      
  )
}

export default Items