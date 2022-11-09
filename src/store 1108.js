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
            "location": {lat: 37.55017, lng: 127.12746},
            "detailMain_tasks": "null",     //주요업무
            "id": "null",
            "position": "null",
            "detailBenefits": "null",   //혜택 및 복지
            "status": "null",
            "detailPreferred_points": "null",    //우대사항
            "mouse": "null",    //디테일페이지에서 개별카드 상태관리용으로 사용
            "clicked": "null"
        }
    ]
};

//스프링으로부터 받아온 데이터 저장
let detailDatas = createSlice({
    name : 'detailDatas',
    initialState : detailDatasFromSpring,
    reducers : {

        changeDetailData(state, action) {
            let copy = state;
            copy = action.payload;
            
            return copy;
        }
    }
})
export let { changeDetailData } = detailDatas.actions


//버튼 클릭 유무(지도관련 반복문으로 맵 중첩되어 생성안되게 할때 사용. 필히 필수. 변수명이 살짝 에러임.)
let isClickBtn = createSlice({
    name : 'isClickBtn',
    initialState : "init",
    reducers : {
        isClicked(state, action) {
            let copy = state;
            copy = action.payload;
            
            return copy;
        }
    }
})
export let { isClicked } = isClickBtn.actions

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
    DetailData: detailDatas.reducer,
    yearSearchValues: year.reducer,
    regionSearchValues: region.reducer,

    isClicked: isClickBtn.reducer
  }
})

