import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

const {kakao} = window; //함수형 컴포넌트에 인지

const KakaoMap = ({tester}) => {

    const data352 = "TEST data352";

    let DetailDataMap = useSelector((state) => state.DetailData);
    const dispatch = useDispatch();

    useEffect(() => {
		var mapContainer = document.getElementById('myMap'), // 지도를 표시할 div
		mapOption = {
			center: new kakao
				.maps
				.LatLng(39.0588821, 125.7669825), // 지도의 중심좌표
			level: 6 // 지도의 확대 레벨
		};

		var map = new kakao.maps.Map(mapContainer, mapOption); 
		var markers = [];

		let testLatLng = new kakao.maps.LatLng(33.451393, 126.570738);

		const addMarker = (position) => {
			var marker = new kakao.maps.Marker({position: position});// 마커생성
			marker.setMap(map); // 마커지도위에 표시
			markers.push(marker);// 생성된 마커 배열에 추가
		}

        function parse(a) {
            var obj = {};

            a.replace(/(\w+)=(\d+\.\d+)/g, function (_, key, val) {
                obj[key] = parseFloat(val);
            });

            return obj;
        }

        let latLngArr = [];
		let testPosition = { "La": 39.0572821, "Ma": 125.7561825 };

        const map_result = DetailDataMap.data.map((values, i) => {

			let latLng = values.location;
			latLngArr.push(parse(latLng));

			addMarker(new kakao.maps.LatLng(parse(latLng).lat, parse(latLng).lng));
		});

    }, [data352, tester, DetailDataMap]); //~useEffect

    return (

        <div className="map" id='myMap'>
            {/* <aside id="roadview" style="width:750px;height:350px;"></aside> */
            }
        </div>

    );
}

export default KakaoMap;