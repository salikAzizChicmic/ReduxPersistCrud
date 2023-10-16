import Animated, {
    call,
    event,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withDecay,
    withDelay,
    withTiming,
  } from "react-native-reanimated";
  
  import {
    LongPressGestureHandler,
    PanGestureHandler,
    TapGestureHandler,
  } from "react-native-gesture-handler";
  
  import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
    Dimensions,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import styles from "./styles";
  import { API_KEY, getConvertedValuesWithUnits, getDisplayUnit, ICONS, images, _scaleText } from "../../../shared";
  import FastImage from "react-native-fast-image";
  import { createImageProgress } from "react-native-image-progress";
  
  const H = Dimensions.get("window").height;
  const W = Dimensions.get("window").width;
  
  const CustomMealsSubItems = ({
    field,
    idx,
    unitSystem,
    deleteCallBack,
    itemSwipes,
    mealSwipe,
    swipedIndex,
    productInfo=()=>{},
    widthAdjust=false
  }) => {
    const [displayCancel, setDisplayCancel] = useState(false);
    const [item, setItem] = useState(field)
    const pressed = useSharedValue(false);
    const translateX = useSharedValue(0);
    const TRANSLATE_THRESHOLD = -W * 0.2;
    const ImageFast = createImageProgress(FastImage);
    const wrapper = (idx) => {
     itemSwipes(idx)
    };
    // console.log(field, "hjbgcfgserfnycxsgefrygyjuftyjuftyuhj")
    const wrapper2 = (value) => {
      setDisplayCancel(value)
     };
    const eventHandler = useAnimatedGestureHandler({
      onStart: (event, ctx) => {
        // itemSwipes(idx)
          runOnJS(wrapper)(idx)
        ctx.test = translateX.value;
      },
      onActive: (event, ctx) => {
        pressed.value = true;
        translateX.value = ctx.test + event.translationX;
      },
      onFinish: (event, ctx) => {
        pressed.value = false;
      },
      onEnd: (event, ctx) => {
        if (translateX.value < TRANSLATE_THRESHOLD) {
          // setDisplayCancel(true);
          runOnJS(wrapper)(idx)
          runOnJS(wrapper2)(true)
          translateX.value = withTiming(TRANSLATE_THRESHOLD);
        } else {
          // setDisplayCancel(false);
          runOnJS(wrapper2)(false)
          translateX.value = withTiming(0);
        }
        pressed.value = false;
      },
    });
    const calculateEnergy = (value, quantityInItem = 1, itemQuantity = 1, isListItem = false) => {
      // // console.log("calculateEn====>>", value, quantityInItem, itemQuantity, nutritionList)
      // console.log("calculateEn====",  value , quantityInItem, parseFloat(itemQuantity) )
      return isListItem ? (value / quantityInItem) * parseFloat(itemQuantity) : value;
    };
    const uas = useAnimatedStyle(() => {
      'worklet'
      return {
        transform: [
          {
            scale: pressed.value ? withTiming(1.05) : withTiming(1)
          },
          {
            translateX: translateX.value < 0 ? translateX.value : 0,
          },
        ],
      };
    });
    useEffect(()=>{
        if(swipedIndex!==idx){
         translateX.value=withTiming(0) 
         setDisplayCancel(false)  
        }
  },[mealSwipe])
  
  useEffect(()=>{
    setItem(field)
  }, [field])
  
    const getKcal=()=>{
      let data = { ...item }
      // console.log(data, "c0onsolelog0111", "data?.item?.altMeasures?.length,", data?.item?.altMeasures?.length)
      if (data?.item?.altMeasures?.length>0){
        let old_serving_weight
        data?.item?.altMeasures?.filter(oldSW => {
          // console.log((item?.item?.unit, item?.item?.serving_unit), "--", oldSW?.measure,"oldSW?.serving_weight==--0099")
          if ((item?.item?.unit) == oldSW?.measure) {
            // console.log(oldSW?.serving_weight, "oldSW?.serving_weight")
            if (data?.item?.servingWeightInGrams == oldSW?.serving_weight){
              old_serving_weight = oldSW?.serving_weight
            }else{
              old_serving_weight = data?.item?.servingWeightInGrams
            }
          }
        })
        if (!old_serving_weight){
          old_serving_weight = data?.item?.servingWeightInGrams
        }
        // console.log(old_serving_weight,"old_serving_weight")
        let new_serving_weight
        let new_Item_Quantity
        data?.item?.altMeasures?.filter(newSW => {
          // console.log((item?.mealUnit , item?.item?.unit) ,"--", newSW?.measure, "oldSW?.serving_weight==--0099")
          if ((item?.mealUnit) == newSW?.measure) {
            // console.log(newSW?.serving_weight, "oldSW?.serving_weight==>", newSW?.qty, '--', newSW, '---', data?.item?.altMeasures)
            new_serving_weight = newSW?.serving_weight
            new_Item_Quantity = newSW?.qty
          }
        })
        // console.log(new_serving_weight, old_serving_weight, Math.abs(new_serving_weight / old_serving_weight), "consolelog000", item)
        let diffOfChangeMessue = Math.abs(new_serving_weight / old_serving_weight)
        // data.itemQuantity = data.serving_qty
        if (isNaN(diffOfChangeMessue)){
          // console.log(data?.item?.calories * data?.itemQuantity, "consolelog000111", data)
          return Math.round((data?.item?.calories * data?.itemQuantity) / data?.item?.quantity)
        }else{
          if (diffOfChangeMessue ==1){
            // console.log((((data?.item?.calories * diffOfChangeMessue) / data?.item?.quantity) * data?.itemQuantity) / data?.item?.quantity * data?.itemQuantity, "last time check krna h", data)
            return Math.round((data?.item?.calories * data?.itemQuantity) / new_Item_Quantity)
          }else{
            // console.log((((data?.item?.calories * diffOfChangeMessue)/data?.item?.quantity)*data?.itemQuantity)/data?.item?.quantity*data?.itemQuantity,"last time check krna h",data)
            // // console.log(data?.item?.calories, diffOfChangeMessue, (data?.itemQuantity / (data?.item?.standardQty || data?.item?.quantity)), new_Item_Quantity || data?.itemQuantity, "consolelog000221", 
            // Math.round((data?.item?.calories * diffOfChangeMessue / (new_Item_Quantity || data?.itemQuantity) * data?.item?.serving_qty || data?.item?.quantity)))
            // // console.log((((data?.item?.calories * diffOfChangeMessue) * data?.itemQuantity) / data?.item?.quantity), "--", data?.item?.calories , diffOfChangeMessue,data?.itemQuantity, "consolelog000221",data)
            // // // console.log(((((data?.item?.calories * diffOfChangeMessue) / new_Item_Quantity))/data?.item?.quantity)*data?.itemQuantity,"skzjufhseufhrcmsr")
            // let calory = Math.round((data?.item?.calories * diffOfChangeMessue / (new_Item_Quantity || data?.itemQuantity) * (data?.item?.serving_qty || data?.item?.quantity)))
            // // // console.log("jzhfsjkfhsafasdkmklsewf",
            //   return calculateEnergy(calory, data?.item?.serving_qty || item?.quantity, data?.itemQuantity ? data?.itemQuantity : data?.itemQuantity == 0 ? 0 : data?.item?.serving_qty, true)
            //     `kcal`,
            //     `kcal`,
            //     0,
            //   )
            // )
            // if (data?.item?.name == "Fage"){
            //   let calory = Math.round((data?.item?.calories * diffOfChangeMessue / (new_Item_Quantity || data?.itemQuantity) * (data?.item?.serving_qty || data?.item?.quantity)))
            //   return calory
            //   calculateEnergy(calory, data?.item?.serving_qty || item?.quantity, data?.itemQuantity ? data?.itemQuantity : data?.itemQuantity == 0 ? 0 : data?.item?.serving_qty, true)
            //   // return Math.round((data?.item?.calories * diffOfChangeMessue / (new_Item_Quantity || data?.itemQuantity) * (data?.item?.serving_qty || data?.item?.quantity)))
            // }else{
              // let calory = Math.round((data?.item?.calories * diffOfChangeMessue / (new_Item_Quantity || data?.itemQuantity) * (data?.item?.serving_qty || data?.item?.quantity)))
              let calory = data?.item?.calories * diffOfChangeMessue / new_Item_Quantity * data?.item?.quantity
              // // console.log(calory, "calorycalorycalorycalory", data?.item?.calories * diffOfChangeMessue / new_Item_Quantity * data?.item?.quantity,data)
              return Math.round(calculateEnergy(calory, data?.item?.serving_qty || data?.item.quantity, data?.itemQuantity ? data?.itemQuantity : data?.itemQuantity == 0 ? 1 : data?.item?.serving_qty, true))
              // return Math.round((data?.item?.calories * diffOfChangeMessue * (data?.itemQuantity / (data?.item?.standardQty || data?.item?.quantity)) / new_Item_Quantity))
            // }
           
          }
          
        }
      }else{
        return Math.round((data?.item?.calories * data?.itemQuantity)/data?.item?.quantity)
      }
    }
    return (
      <TouchableOpacity onPress={() => productInfo()}>
      <View style={styles.bottomContainer} key={idx}>
        <View style={styles.lineContainer} />
        <PanGestureHandler
          onGestureEvent={eventHandler}
          activeOffsetX={[-10, 10]}
        >
          <Animated.View
            style={ 
           [styles.childContainer, uas,]
            }
              key={item?.item?._id?.toString()}
          >
            {displayCancel && (
              <Pressable
                onPress={() => {
                    setDisplayCancel(false)
                    deleteCallBack(idx, item);
                  translateX.value=withTiming(0)
                }}
                style={styles.deleteCtr}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            )}
            <View>
              
            </View>
              {item?.item?.thumbUrl && <ImageFast
                renderError={() => 
                  <Image
                    style={[styles.mealSubItemImage, {      
                      overflow: "hidden",}]}
                    source={images.DEFAULT_IMAGE_FUEL}
                  /> 
                // <Image source={images.DEFAULT_IMAGE_FUEL} style={[styles.mealSubItemImage]}
                //   resizeMode="cover" />
                }
                style={[styles.mealSubItemImage, { overflow: "hidden", }]}
                resizeMode='contain'
                source={{ uri: item?.item?.thumbUrl, headers: { "X-API-KEY": API_KEY } }}
              />}
            {/* <Image
              style={[styles.mealSubItemImage,]}
                source={{ uri: item?.item?.thumbUrl }}
            /> */}
            <View style={[styles.mealSubItemCtr, { width: widthAdjust? W * 0.40:W*0.51}]}>
                <Text numberOfLines={1} style={styles.mealSubItemName}>{item?.item?.name}</Text>
                <View style={{flexDirection:'row'}}>
                
                  <Text numberOfLines={1} style={[styles.mealSubItemQuantity, { maxWidth: item?.item?.brandName ?W*0.2:0}]}>{item?.item?.brandName ? item?.item?.brandName+',' : ""}</Text>
                  <Text numberOfLines={1} style={styles.mealSubItemQuantity}>
                {" "}
                  {
                    
                  [
                    // Number(item?.itemQuantity || item?.item?.quantity).toFixed(2)
                        Number(item?.itemQuantity || item?.item?.quantity) === Number(item?.itemQuantity || item?.item?.quantity) && Number(item?.itemQuantity || item?.item?.quantity) % 1 !== 0 ?
                          Number(item?.itemQuantity || item?.item?.quantity).toFixed(2) : Number(item?.itemQuantity || item?.item?.quantity)
                  
                  , " ", item?.mealUnit || item?.item?.unit] }
              </Text>
                </View>
                {/* if (Number(item?.itemQuantity || item?.item?.quantity === Number(item?.itemQuantity || item?.item?.quantity && Number(item?.itemQuantity || item?.item?.quantity % 1 !== 0?
                  Number(item?.itemQuantity || item?.item?.quantity).toFixed(2):Number(item?.itemQuantity || item?.item?.quantity)
                } */}
            </View>
  
            <View style={styles.mealSubItemSmallCtr}>
              {ICONS.CALOREIS(15)}
              <Text style={styles.mealSubItemCalories}>
  
                  {getKcal()}
                  {/* {getConvertedValuesWithUnits(
                    calculateEnergy(item?.item?.calories, item?.item?.quantity, item?.itemQuantity, true),
                    `kcal`,
                    `kcal`,
                    0
                  )} */}
              </Text>
  
              <TouchableOpacity
                style={{ alignSelf: "center", padding: _scaleText(4).fontSize }}
                disabled={true}
              >
                {ICONS.AVOID_ARROW(18)}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </PanGestureHandler>
        
      </View>
      </TouchableOpacity>
    );
  };
  
  export default CustomMealsSubItems;
  