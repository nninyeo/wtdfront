import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
// import JobList from './pages/JobList.js';
import { changeDetailData } from '../store'
//unpkg.com/ionicons@5.5.2/dist/svg/location-outline.svg

const {kakao} = window; //함수형 컴포넌트에 인지

const KakaoMap = ({tester}) => {

    const data352 = "TEST data352";

    let DetailDataMap = useSelector((state) => state.DetailData);
    const dispatch = useDispatch();

    useEffect(() => {/****************useEffectuseEffectuseEffectuseEffectuseEffect*************************/
		var mapContainer = document.getElementById('myMap'), // 지도를 표시할 div
		mapOption = {
			center: new kakao.maps.LatLng(37.4981, 127.02754), // 지도의 중심좌표
			level: 7 // 지도의 확대 레벨
		};

		var map = new kakao.maps.Map(mapContainer, mapOption); 
		// var markers = [];
        
        var imageSrcBlack = 'https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/location-pin-64.png'; // 마커이미지의 주소입니다
        var imageSrcBlue = 'https://cdn0.iconfinder.com/data/icons/map-asset-1/24/location-2-64.png'
        var imageSizeNormal = new kakao.maps.Size(28, 28); // 마커이미지의 크기입니다
        var imageSizeBig = new kakao.maps.Size(34, 34); // 마커이미지의 크기입니다
        var imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
        
        var normalImage = new kakao.maps.MarkerImage(imageSrcBlack, imageSizeNormal, imageOption);
        var overImage = new kakao.maps.MarkerImage(imageSrcBlack, imageSizeBig, imageOption);
        var clickImage = new kakao.maps.MarkerImage(imageSrcBlue, imageSizeBig, imageOption);
        
        
		// let testLatLng = new kakao.maps.LatLng(33.451393, 126.570738);
        
		const addMarker = (position) => {
            
            var marker = new kakao.maps.Marker({ position: position.latlng, image: normalImage });// 마커생성
			// markers.push(marker);// 생성된 마커 배열에 추가
            
            marker.normalImage = normalImage;// 마커 객체에 마커아이디와 마커의 기본 이미지를 추가
            
			marker.setMap(map); // 마커지도위에 표시
            
            
            var selectedMarker = null; // 클릭한 마커를 담을 변수





            var infowindow = new kakao.maps.InfoWindow({
                content: position.content // 인포윈도우에 표시할 내용
            });


            const testOver = () => {
                debugger;
                // infowindow.open(map, marker);
                
            }
            // kakao.maps.event.addListener(marker, 'mouseover', testOver(map, marker, infowindow));

            //kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));

            // 마커 이벤트: 오버시
            /*
            kakao.maps.event.addListener(marker, 'mouseover', function() {

                
                // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 오버 이미지로 변경합니다
                if (!selectedMarker || selectedMarker !== marker) {
                    // marker.setImage(overImage);
                    setTimeout(() => {
                        let presentationChangeTarget = JSON.parse(JSON.stringify(DetailDataMap));
                        presentationChangeTarget.data[position.seq].presentation = "over";
                        dispatch(changeDetailData(presentationChangeTarget));
                      }, 5000)
                }
                
                
                //louis
                //louis
            });
            */


            // 마커 이벤트: 탈출시
            /*
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                console.log('11111')

                // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 기본 이미지로 변경합니다
                if (!selectedMarker || selectedMarker !== marker) {
                    setTimeout(() => {
                        let presentationChangeTarget = JSON.parse(JSON.stringify(DetailDataMap));
                        presentationChangeTarget.data[position.seq].presentation = "null";
                        dispatch(changeDetailData(presentationChangeTarget));
                      }, 5000);
                    // marker.setImage(normalImage);
                }

                //louis
                // let presentationChangeTarget = JSON.parse(JSON.stringify(DetailDataMap));
                // presentationChangeTarget.data[position.seq].presentation = "null";
                // dispatch(changeDetailData(presentationChangeTarget));
                //louis

            });
            */

            // 마커 이벤트: 클릭시
            kakao.maps.event.addListener(marker, 'click', function() {
                // console.log(`id: ${position.id}, seq: ${position.seq}`);



                // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 클릭 이미지로 변경합니다
                if (!selectedMarker || selectedMarker !== marker) {

                    // 클릭된 마커 객체가 null이 아니면
                    // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                    //( !!: Boolean으로 형 변환. [undefined, "", 0] 일 경우 결과는 false 나머지 다 트루)
                    !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

                    // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                    marker.setImage(clickImage);
                } else {
                    marker.setImage(normalImage);
                }
                debugger;

            // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
                selectedMarker = marker;
            });







            // var infowindow = new kakao.maps.InfoWindow({
            //     content: position.content // 인포윈도우에 표시할 내용
            // });

            //louis
            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow, selectedMarker, position));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
		}

        //---------------------------------------------------------------------------


        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new kakao.maps.LatLngBounds();    

        let latLngArr = []; //불러온 데이터들의 lat,lng 어레이. 내부는 KV형태
		// let testPosition = { "La": 39.0572821, "Ma": 125.7561825 };

        function stringToObjParse(param839) { //DetailDataMap.data[n]location의 스트링->obj변환
            var obj = {};
    
            param839.replace(/(\w+)=(\d+\.\d+)/g, function (_, key, val) {
                obj[key] = parseFloat(val);
            });
    
            return obj;
        }

        const map_result = DetailDataMap.data.map((values, i) => {  //값꺼내서 parse후 마커찍기
            
			let latLng = values.location;
			latLngArr.push(stringToObjParse(latLng));

            let position = {}
            
            position.id = values.id;
            position.seq = i;
            position.content = `<div style="background-color:yellow">` + values.company + `</div>`;
            position.latlng = new kakao.maps.LatLng(latLngArr[i].lat, latLngArr[i].lng);  
            //louis
            addMarker(position);
            bounds.extend(new kakao.maps.LatLng(latLngArr[i].lat, latLngArr[i].lng));//바운더리계산
		});

        (() => {  // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정
            map.setBounds(bounds);
        })();




    //-------------------------------------------------------------------------------------


        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow, selectedMarker, position) {
            return function() {
                infowindow.open(map, marker);

                if (!selectedMarker || selectedMarker !== marker) {
                    // marker.setImage(overImage);
                    // setTimeout(() => {
                        let presentationChangeTarget = JSON.parse(JSON.stringify(DetailDataMap));
                        presentationChangeTarget.data[position.seq].presentation = "over";
                        dispatch(changeDetailData(presentationChangeTarget));
                    //   }, 5000)
                }
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }

    }, [data352, tester, DetailDataMap, dispatch]); //~useEffect  /****************useEffectuseEffectuseEffectuseEffectuseEffect*************************/



    return (

        <div className="geo" id='myMap'>
            {/* <aside id="roadview" style="width:750px;height:350px;"></aside> */
            }
        </div>

    );
}

export default KakaoMap;