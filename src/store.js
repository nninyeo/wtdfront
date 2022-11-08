import { configureStore, createSlice } from '@reduxjs/toolkit'


let detailDatasFromSpring = {
    "data": [
        {
            "address": "null",
            "thumb": "null",
            "dueTime": "null",
            "detailIntro": "null",  //회사소개
            "detailRequirements": "null",   //자격요건
            "company": "null",
            "location": "{lat=125.7669825, lng=39.0588821}",
            "detailMain_tasks": "null",     //주요업무
            "id": "null",
            "position": "null",
            "detailBenefits": "null",   //혜택 및 복지
            "status": "null",
            "detailPreferred_points": "null"    //우대사항
        }
    ]
};

//스프링으로부터 받아온 데이터 저장
let detailDatas = createSlice({
    name : 'detailDatas',
    initialState : detailDatasFromSpring,
    reducers : {               
        changeDetailData(state, action){
            let copy = state;
            copy = action.payload;
            
            return copy;
        }
    }
})
export let { changeDetailData } = detailDatas.actions


//Year모달 동작값 저장
let year = createSlice({
    name : 'yearSearchValues',
    initialState : [0, 10, "전체"],//start/end/text
    reducers : {
        changeYear(state, action) {
            return action.payload
        }
    }
})
export let { changeYear } = year.actions


//Region모달 동작값 저장
let region = createSlice({
    name : 'regionSearchValues',
    // initialState : {선택갯수  //  한글string  //  url스트링묶음  //  지역요약한글명 (강동구 외)}
    initialState : {townQty : 0, townKOR : [], townUrlParam : ["all"], townETCKOR : "전체지역" },
    reducers : {
        changeRegion(state, action) {
            return action.payload
        }
    }
})
export let { changeRegion } = region.actions



//export reducer
export default configureStore({
  reducer: {
    DetailData : detailDatas.reducer,
    yearSearchValues : year.reducer,
    regionSearchValues : region.reducer
  }
})

