import { createSlice, nanoid } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: [],
  },
  reducers: {
    adddata: (state, action) => {
      const temp={
        id:nanoid(),
        data:action.payload.name,
        mobile:action.payload.mobile
      }
      state.value.push(temp);
      //state.value=[]
      console.log(state.value)
    },
    removeData: (state,action) => {
      const newData=state.value.filter((val)=>{
        return val.id!=action.payload
      })
      state.value = newData
      console.log(state.value)
    },
    updateData: (state, action) => {
      //console.log(action.payload.split(" ")[0])
      //console.log(action.payload.split(" ")[1])
      state.value.map((val,ind)=>{
        
        if(action.payload.split("#$")[2]==="name"){
          if (val.id === action.payload.split("#$")[0]) {
            val.id = val.id
            val.data = action.payload.split("#$")[1]
          }
        }else{
          if (val.id === action.payload.split("#$")[0]) {
            val.id = val.id
            val.mobile = action.payload.split("#$")[1]
          }
        }
        
        
        }
      )
      //state.value = newData
      console.log(state.value)
    },
  },
});

export const { adddata, removeData, updateData } = counterSlice.actions;

export const selectCount = state => state.counter.value;

export default counterSlice.reducer;