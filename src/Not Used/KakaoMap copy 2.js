import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
// import JobList from './pages/JobList.js';
import { changeDetailData } from '../store'
//unpkg.com/ionicons@5.5.2/dist/svg/location-outline.svg

const {kakao} = window; //함수형 컴포넌트에 인지

const KakaoMap = ({tester}) => {

    // const data352 = "TEST data352";

    let DetailDataMap = useSelector((state) => state.DetailData);
    const dispatch = useDispatch();

    useEffect(() => {

        var mapContainer = document.getElementById('geomap'), // 지도를 표시할 div  
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
    
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
     
    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
    var positions = [
        {
            content: '<div>카카오</div>', 
            latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
            content: '<div>생태연못</div>', 
            latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
            content: '<div>텃밭</div>', 
            latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        },
        {
            content: '<div>근린공원</div>',
            latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        }
    ];
    
    
    /* 아래와 같이도 할 수 있습니다 */
    




    
    for (var i = 0; i < positions.length; i ++) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng // 마커의 위치
        });
    
        // 마커에 표시할 인포윈도우를 생성합니다 
        var infowindow = new kakao.maps.InfoWindow({
            content: positions[i].content // 인포윈도우에 표시할 내용
        });
    
        // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
        // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        (function(marker, infowindow) {
            // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.open(map, marker);
            });
    
            // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });
        })(marker, infowindow);
    }
    

    }); //~useEffect



    return (

        <div className="geo" id='geomap'>
            {/* <aside id="roadview" style="width:750px;height:350px;"></aside> */
            }
        </div>

    );
}

export default KakaoMap;