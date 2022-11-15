import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeDetailData, isSearched, mutationRightList } from '../store'

const { kakao } = window; //함수형 컴포넌트에 인지

const KakaoMap = ({tester}) => {    

    const dispatch = useDispatch();

    let cardData = useSelector((state) => state.DetailData);
    //클릭의 성격. ex) 검색버튼, 회사정보클릭.. 등등
    let searched = useSelector((state) => state.isSearched);

    let [ withMap, setWithMap ] = useState([]);
    let [ withMarkers, setWithMarkers ] = useState([]);
    let [ withInfowindows, setWithInfowindows ] = useState([]);

    let rightList = useSelector((state) => state.mutationList);
    let imageSizeNormal = new kakao.maps.Size(38, 38); // 마커이미지 크기
    let imageOption = {offset: new kakao.maps.Point(19, 38)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
    let normaUrl = 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/157_Twitter_Location_Map-64.png';
    let clickUrl = 'https://cdn1.iconfinder.com/data/icons/maps-and-navigation-free/32/Maps_Maps_Navigation_Gps_Pin_Location-01-64.png';
    let normalImage = new kakao.maps.MarkerImage(normaUrl, imageSizeNormal, imageOption);//핑크
    let clickImage = new kakao.maps.MarkerImage(clickUrl, imageSizeNormal, imageOption);//파랑
    
    if(rightList.index !== "") {
        markerControl(withMap, withMarkers, withInfowindows, rightList);
        //이부분에 현재 렌더링오류발생: Cannot update a component (`KakaoMap`) while rendering a different component (`KakaoMap`). To locate the bad setState() call inside `KakaoMap`
    }

    function markerControl(map, markers, infowindows, indexs) {
        let index = indexs.index;
        let prvIndex = indexs.prvIndex;
        let marker = markers[index];
        let infowindow = infowindows[index];
        let preMarker = markers[prvIndex];
        let preInfowindow = infowindows[prvIndex];

        if(indexs.index !== "") {
            const clickedData = { "index": "", "prvIndex": index }
            marker.setImage(clickImage);
            infowindow.open(map, marker);
            dispatch(mutationRightList(clickedData));
        }

        if(index === prvIndex) {
            const clickedData = { "index": "", "prvIndex": "" }
            marker.setImage(normalImage);
            infowindow.close(map, marker);
            dispatch(mutationRightList(clickedData));

            return false;
        }

        if(prvIndex !== "") {
            const clickedData = { "index": "", "prvIndex": index }
            preMarker.setImage(normalImage);
            preInfowindow.close(map, marker);
            dispatch(mutationRightList(clickedData));

            return false;
        }
    }
    
    useEffect(() => {
        /*** 각종 변수함수 선언 및 세팅 ***/
        let selectedMarker = null;
        let selectedInfowindow = null;

        if(searched !== "init" && searched !== "after") {
            let mapContainer = document.getElementById('geomap'),
            mapOption = { 
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
                isPanto: true,
            };
            
            let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

            setWithMap(map);

            //마커이미지관련
            let imageSizeNormal = new kakao.maps.Size(38, 38); // 마커이미지 크기
            let imageOption = {offset: new kakao.maps.Point(19, 38)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정

            var normalImage = new kakao.maps.MarkerImage('https://cdn4.iconfinder.com/data/icons/twitter-29/512/157_Twitter_Location_Map-64.png', imageSizeNormal, imageOption);//핑크
            var hoverImage = new kakao.maps.MarkerImage('https://cdn0.iconfinder.com/data/icons/flat-3/128/Location.png', imageSizeNormal, imageOption);//핑크안에있음
            var clickImage = new kakao.maps.MarkerImage('https://cdn1.iconfinder.com/data/icons/maps-and-navigation-free/32/Maps_Maps_Navigation_Gps_Pin_Location-01-64.png', imageSizeNormal, imageOption);//파랑

            dispatch(isSearched("after"));//맵생성차단.

            let positions = []; //마커 내용물 제작
            for(let k = 0; k < cardData.data.length; k++) {
                positions[k] = 
                {
                    content: `<div style="background-color:yellow; align: center;">` + cardData.data[k].company + `</div>`,
                    latlng: new kakao.maps.LatLng(cardData.data[k].location.lat, cardData.data[k].location.lng),
                    image: normalImage,
                    seq: k,
                }
            }
        
            // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
            let bounds = new kakao.maps.LatLngBounds();    
            let markers = [];
            let infowindows = []

            /***  지도에 정보 뿌리고 이벤트등록 ***/
            for (let index = 0; index < positions.length; index++) {
                // 마커 생성
                let marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[index].latlng, // 마커의 위치
                    image: normalImage,
                });

                // 인포윈도우 생성 
                let infowindow = new kakao.maps.InfoWindow({
                    content: positions[index].content // 인포윈도우에 표시할 내용
                });
                
                //markers = [], infowindows = []에 push하고 for 끝나고
                //withMarkers, withInfowindows에 setter.
                markers.push(marker);
                infowindows.push(infowindow)

                // 마커에 이벤트 등록
                kakao.maps.event.addListener(marker, 'mouseover', hoverListener(map, marker, infowindow, index, cardData.data[index].clicked));
                kakao.maps.event.addListener(marker, 'mouseout', outListener(map, marker, infowindow, index, cardData.data[index].clicked));
                kakao.maps.event.addListener(marker, 'click', clickListener(map, marker, infowindow, index, cardData.data[index].clicked));

                // 지도범위 재설정용 LatLngBounds 객체에 좌표 추가. 그리고 지도반영
                bounds.extend(positions[index].latlng);
                map.setBounds(bounds);
            }

            setWithMarkers(markers);
            setWithInfowindows(infowindows);
        }

        // /*** 기타등등 함수 ***/
        // Hover 클로저 이벤트
        function hoverListener(map, marker, infowindow, index) {
            return function() {
                if(!selectedMarker || selectedMarker !== marker) {
                    marker.setImage(hoverImage);
                    infowindow.open(map, marker);

                    let mouseChangeTarget = JSON.parse(JSON.stringify(cardData));
                    let ms = mouseChangeTarget.data[index];
                    ms.mouse = "hover";

                    dispatch(changeDetailData(mouseChangeTarget));
                }
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
                    marker.setImage(clickImage);
                }
                
                // 클릭된 마커를 현재 클릭된 마커 객체로 설정
                selectedMarker = marker;
                selectedInfowindow = infowindow;

                let mouseChangeTarget = JSON.parse(JSON.stringify(cardData));
                let ms = mouseChangeTarget.data[index];
                ms.mouse = "click";
                ms.clicked = "clicked";
                 
                dispatch(changeDetailData(mouseChangeTarget));
            };
        }

    }, [ cardData, searched, dispatch ]); //~useEffect

    return (
        <div className="geo" id='geomap'>
            <div className="geo__text__announcement">
                   <h1>조건을 지정해서 검색하기 버튼을 눌러주세요</h1>
                   <h3>개발 관련 공고만 지원합니다</h3>
                   <h3>검색가능지역: 서울 동부 및 경기 성남 하남 (우리집근처)</h3>
            </div>
        </div>
    );
}
export default KakaoMap;