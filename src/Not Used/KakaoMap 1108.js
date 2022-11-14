import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { changeDetailData, isClicked } from '../store'

const {kakao} = window; //함수형 컴포넌트에 인지



const KakaoMap = ({tester}) => {
    let cardData = useSelector((state) => state.DetailData);

    //클릭의 성격. ex) 검색버튼, 회사정보클릭.. 등등
    let clicked = useSelector((state) => state.isClicked);
    const dispatch = useDispatch();

    useEffect(() => {
        let selectedMarker = null;
        let selectedInfowindow = null;

        /*** 각종 변수함수 선언 및 세팅 ***/
        if(clicked !== "init" && clicked !== "after") {
            var mapContainer = document.getElementById('geomap'), // 지도를 표시할 div  
            mapOption = { 
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
            
            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성
            
            //마커이미지관련
            var imageSizeNormal = new kakao.maps.Size(32, 32); // 마커이미지 크기
            var imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
            var normalImage = new kakao.maps.MarkerImage('https://cdn4.iconfinder.com/data/icons/twitter-29/512/157_Twitter_Location_Map-64.png', imageSizeNormal, imageOption);//핑크
            var hoverImage = new kakao.maps.MarkerImage('https://cdn0.iconfinder.com/data/icons/flat-3/128/Location.png', imageSizeNormal, imageOption);//핑크안에있음
            var clickImage = new kakao.maps.MarkerImage('https://cdn1.iconfinder.com/data/icons/maps-and-navigation-free/32/Maps_Maps_Navigation_Gps_Pin_Location-01-64.png', imageSizeNormal, imageOption);//파랑

            var positions = []; //마커 내용물 제작
            let cardDatas = cardData.data;

            for(let k = 0; k < cardDatas.length; k++) {
                positions[k] = 
                {
                    content: `<div style="background-color:yellow; align: center;">` + cardDatas[k].company + `</div>`,
                    latlng: new kakao.maps.LatLng(cardDatas[k].location.lat, cardDatas[k].location.lng),
                    image: normalImage,
                    seq: k,
                }
            }
        
            dispatch(isClicked("after"));

            // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
            var bounds = new kakao.maps.LatLngBounds();    

            /***  지도에 정보 뿌리고 이벤트등록 ***/
            for (let index = 0; index < positions.length; index++) {
                // 마커 생성
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[index].latlng, // 마커의 위치
                    image: normalImage,
                });

                // 인포윈도우 생성 
                var infowindow = new kakao.maps.InfoWindow({
                    content: positions[index].content // 인포윈도우에 표시할 내용
                });
            

                // 마커에 이벤트 등록
                kakao.maps.event.addListener(marker, 'mouseover', hoverListener(map, marker, infowindow, index));
                kakao.maps.event.addListener(marker, 'mouseout', outListener(map, marker, infowindow, index, cardData.data[index].clicked));
                kakao.maps.event.addListener(marker, 'click', clickListener(map, marker, infowindow, index));

                // 지도범위 재설정용 LatLngBounds 객체에 좌표 추가. 그리고 지도반영
                bounds.extend(positions[index].latlng);
                map.setBounds(bounds);
            }

        }

        
        // /*** 기타등등 함수 ***/
        // Hover 클로저 이벤트
        function hoverListener(map, marker, infowindow, index) {
            return function() {
                if (!selectedMarker || selectedMarker !== marker) {
                    marker.setImage(hoverImage);
                    infowindow.open(map, marker);
                }

                let mouseChangeTarget = JSON.parse(JSON.stringify(cardData));
                let ms = mouseChangeTarget.data[index];
                ms.mouse = "hover";
                //ms.clicked = "noClick";

                dispatch(changeDetailData(mouseChangeTarget));
            };
        }
        
        
        // Mouse Out 클로저 이벤트
        function outListener(map, marker, infowindow, index, paraClicked) {
            return function() {
                if (!selectedMarker || selectedMarker !== marker) {
                    marker.setImage(normalImage);
                    infowindow.close(map, marker);

                    let mouseChangeTarget = JSON.parse(JSON.stringify(cardData));
                    let ms = mouseChangeTarget.data[index];

                    if (paraClicked !== "clicked"){
                        ms.mouse = "out";

                        dispatch(changeDetailData(mouseChangeTarget));
                    }

                }
                
            };
        }
        
        // Click 클로저 이벤트
        function clickListener(map, marker, infowindow, index) {
            return function() {
                if (!selectedMarker || selectedMarker !== marker) {
                    !!selectedMarker && selectedMarker.setImage(normalImage)
                    
                    selectedInfowindow?.close(map, marker);
                    // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                    marker.setImage(clickImage);
                }
        
                // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
                selectedMarker = marker;
                selectedInfowindow = infowindow;

                let mouseChangeTarget = JSON.parse(JSON.stringify(cardData));
                let ms = mouseChangeTarget.data[index];
                ms.mouse = "click";
                ms.clicked = "clicked";
                debugger;
                 
                dispatch(changeDetailData(mouseChangeTarget));
            };
        }

    }, [ cardData, dispatch ]); //~useEffect

    return (
        <div className="geo" id='geomap'></div>
    );
}
export default KakaoMap;