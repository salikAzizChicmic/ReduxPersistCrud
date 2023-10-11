import React, { useEffect, useState } from 'react'
import { ScrollView,Text,View,Image,TextInput, TouchableOpacity } from 'react-native'
import Items from '../Items/Items'
import { useNavigation } from '@react-navigation/native'
import { selectCount } from '../../redux/features/counter/counterSlice'
import { useSelector } from 'react-redux'
import styles from './style'

const Dashboard = () => {
    console.log('====================================');
    console.log("I AM HEREEEE!!!");
    console.log('====================================');
    const navigation = useNavigation()
    const count = useSelector(selectCount);
    
    const reversedArray = [];

    for (let i = count.length - 1; i >= 0; i--) {
        reversedArray.push(count[i]);
        console.log(count[i].mobile)
    }

    console.log(reversedArray); // [{ c: 3 }, { b: 2 }, { a: 1 }]

    const [searchArray,setSearchArray]=useState([])
    const handleBack = () => {
        navigation.navigate('Add')
    }
    const [searchText, setSearchText] = useState("");
    
    const handleSearchChange = (text) => {
        setSearchText(text)
        //console.log(searchText)
        searching(text)
    }

    const searching = (text) => {
        const temp = count.filter((ele) => { return ele.data.toLowerCase().includes(text.toLowerCase().trim()) })
        setSearchArray(temp)
    }
    
    return (
        <View style={styles.container}>
            {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginVertical: 15, marginHorizontal: 15 }}>CRUD Database</Text>
                <TouchableOpacity onPress={handleBack}>
                    <Image style={{ height: 30, width: 30, marginVertical: 15, marginHorizontal: 15 }} source={require('../../Assets/Images/add-item.png')} />
                </TouchableOpacity>
            </View>
                <View style={{ height: 57, flexDirection: 'row', backgroundColor: 'white', marginHorizontal: '4%', borderRadius: 18 }}>
                    <Image style={{ height: 20, width: 20, marginVertical: 18, marginLeft: 10, marginRight: 6 }} source={require('../../Assets/Images/searchs.png')} />
                <TextInput
                    placeholder='Enter Your Requirements' 
                    onChangeText={handleSearchChange}
                    value={searchText}
                    />
                </View> */}
      <ScrollView style={styles.scrollDesign}>
                { reversedArray.map((ele) => {
                    return <Items mobile={ele.mobile} id={ele.id} data={ele.data} key={ele.id} />
                })}
                {searchArray.length>0 && searchArray.map((ele) => {
                    return <Items mobile={ele.mobile} id={ele.id} data={ele.data} key={ele.id} />
                })}
      </ScrollView>
        </View>
  )
}

export default React.memo(Dashboard)