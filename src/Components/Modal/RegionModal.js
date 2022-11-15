import React from "react";
import ReactDOM from "react-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeRegion } from '../../store';

const modalStyle = {
    // position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%", maxWidth: "500px",
    minHeight: "687px", maxHeight: "687px",
    backgroundColor: "#FFFFFF", 
    zIndex: "999",
    borderRadius: "5px",
    position: "absolute",
    overflow: "hidden",
};

const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0", 
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: "777"
};

const RegionModal = (props) => {

    //모달창 내용 적용 props
    const propsApplyRegionModal = props.applyRegionModal;

    //store 데이터 로드
    const regionFromStore = useSelector((aa) => aa.regionSearchValues );

    //store에 갖다놓기위한 준비
    const dispatch = useDispatch();

    //store 데이터 세분화, [0]: 선택갯수, [1]: 마을목록string [2]: url스트링묶음 [3]: 한글약어(부산 등)
    // const [currentRegionValue, setCurrentRegionValue] = useState([regionFromStore[0],regionFromStore[1],regionFromStore[2],regionFromStore[3]]);
    let selectedText = "부산 등";
    let selectedTownParam = ["abc"];
    let cityInfo = {
        "서울": [
          "강동구",
          "송파구",
          "강남구"
        ],
        "경기": [
          "하남시",
          "성남시"
        ]
    }
    let cityEng = {
        "전체": "all",
        "강동구": "seoul.gangdong-gu",
        "송파구": "seoul.songpa-gu",
        "강남구": "seoul.gangnam-gu",
        "성남시": "gyeonggi.seongnam-si",
        "하남시": "gyeonggi.hanam-si",
    }
    //전체/서울/경기 클릭한거 1개
    // const [currentTown, setCurrentTown] = useState(""); 

    //선택한 큰지역/세부지역 리스트
    let [selectedTown, setSelectedTown] = useState(regionFromStore.townKOR);   //선택한마을: 강동구 하남시 등의 하위 상세지역
    let [selectedCity, setSelectedCity] = useState([]);   //선택한도시: 서울 경기 등 큰 도시
    let [listOfTown, setListOfTown] = useState([]);       //선택한 도시에 따른 전체 마을목록

    //조건에 따른 url 파라미터 설정
    function modifyUrlParams () {
        //selectedTown[]을 반복문 돌려서 cityEng통해 매치시키고 그 값을 selectedTownParam[]에 넣으면 되겠다
        for(let k = 0; k < selectedTown.length; k++) {
            
            selectedTownParam[k] = cityEng[selectedTown[k]];
            
        }
        // console.log(selectedTownParam);

    }

    //조건에 따른 한글약어 수정
    function modifySetCurrentRegionValue () {
        selectedText = selectedTown[0];
        if ( selectedTown.length > 1 ) {
            selectedText += ' 등';
        }
        // setCurrentRegionValue([selectedTown.length, selectedTown, "", selectedText]);//동작안됨
    }

    //모달내용 store에 dispatch
    function applyRegion() {
        modifySetCurrentRegionValue();
        modifyUrlParams();

        // dispatch(changeRegion(currentRegionValue));
        // dispatch(changeRegion([selectedTown.length, selectedTown, "", selectedText]));
        
        dispatch(changeRegion({
            townQty : selectedTown.length, 
            townKOR : selectedTown, 
            townUrlParam : selectedTownParam, 
            townETCKOR : selectedText,
        }));
        
        propsApplyRegionModal();
        
    }

    useEffect(()=>{
        // setCurrentRegionValue([selectedTown.length, selectedTown, "", selectedText]);//이게또작동이안되네.....
    }, [selectedText]) 




    //선택된 마을의 데이터 추가/제거
    const addSelectedTown = (test) => {
        setSelectedTown([...selectedTown, test]);
    };
    const removeSelectedTown = (test) => {
        setSelectedTown(selectedTown.filter(town => town !== test));
    };
    const resetSelectedAll = () => {
        setSelectedTown([]);
        setSelectedCity([]);
    };


    const resetSelectedCity = () => {
        setSelectedCity([]);
    }
    
    //특정 마을 데이터 유무에 따른 도시데이터 추가/삭제 실행 - 기능삭제.
    const calcTownToCity = () => {

        
        // city status를 리셋후 시작
        //setSelectedCity([]);
        //반복하기(selectedTown 갯수만큼)

        //만약 선택한 세부도시가 없으면 세부도시를 선택할수있게 지금 클릭한 위치
        //에서 상세지역 목록을 보여줘얗마.

        //중복처리하기
        // for (let i = 0; i < selectedTown.length; i++) {
        //     if ((selectedTown.filter(x => cityInfo.서울.includes(x))).length === 1){
        //         setSelectedCity([...selectedCity, "서울"]);
        //         //selectedCity을 훑어서 "서울"에 해당하는 데이터가 있는경우 setSelectedCity에 "서울"을 +
        //         break;
        //     }
        //     if ((selectedTown.filter(x => cityInfo.경기.includes(x))).length === 1){
        //         setSelectedCity([...selectedCity, "경기"]);
        //         //selectedCity을 훑어서 "경기"에 해당하는 데이터가 있는경우 setSelectedCity에 "경기"을 +
        //         break;
        //     }
        // }
        // console.log("calcTownToCity실행완료");
        
    }


    //지금 클릭한 마을에 대해
    const nowClickedTown = e => {


        //마을 데이터 추가/삭제 실행
        let test = e.target;
        let findFlag = selectedTown.find(val => val === test.innerHTML);
        if(findFlag === undefined) {
            addSelectedTown(test.innerHTML);
        }
        else {
            removeSelectedTown(test.innerHTML);

        }

    //기능삭제.
        //특정 마을 데이터 유무에 따른 도시데이터 추가/삭제 실행
        // if ((cityInfo.서울).filter(x => selectedTown.includes(x)).length !== 0){
        //     let temp456 = [...selectedCity]
        //     temp456.filter((x) => x !== '서울')
        //     setSelectedCity = temp456;
        // }
        // if ((cityInfo.경기).filter(x => selectedTown.includes(x)).length !== 0){
        //     let temp456 = [...selectedCity]
        //     temp456.filter((x) => x !== '경기')
        //     setSelectedCity = temp456;
        // }

    };



    //SVG에 대한 클릭이벤트
    const removeTag = e => {
        let target = e.target;
        let inHtml = "";

        if(target.tagName === 'svg') inHtml = target.previousSibling.innerHTML;
        if(target.tagName === 'SPAN') inHtml = target.innerHTML;
        if(target.tagName === 'path') inHtml = target.parentElement.firstChild.innerHTML;
        
        removeSelectedTown(inHtml);

    };



    // 지금 클릭한 도시에 대한 처리 - 제작중
    const nowClickedCity = e => {
        let nowClickedCityName = e.target.innerHTML

        //선택도시목록 리셋
        setListOfTown([]);

        //둘다 작동이안됨.
        resetSelectedCity();
        setSelectedCity([]);

        //데이터 할당
        // setCurrentTown(nowClickedCityName);

        // 현재 선택한 도시에 대해 이미 도시목록에 있으면 삭제, 없으면 추가
        if(nowClickedCityName === "서울") {
            // setSelectedCity(selectedCity.filter(city => city !== "경기"));//경기제거

            if (selectedCity.includes("서울") === true){//이미있으면삭제
                setSelectedCity(selectedCity.filter(city => city !== "서울"));
                return false;
            }
            setSelectedCity([...selectedCity, "서울"]);//서울추가
            setListOfTown([...cityInfo.서울]);//서울목록추가
        }
        if(nowClickedCityName === "경기") {
            if (selectedCity.includes("경기") === true){
                    setSelectedCity(selectedCity.filter(city => city !== "경기"));
                return false;
            }
            setSelectedCity([...selectedCity, "경기"]);//경기추가
            // console.log(selectedCity);
            // setSelectedCity(selectedCity.filter(city => city !== "서울"));//서울제거
            setListOfTown([...cityInfo.경기]);
        }

        //  if(currentTown.includes("전체") === "전체"){//지우면고장
        //     // setlistOfTown = ["전체"];
        //  }
         calcTownToCity();
         nowClickedCityName = "";
    };



    useEffect(() => {

        //0. 랜더링 후 현재 상세지역 목록
        let detailTown = document.querySelectorAll("[right-btn-attr=detail-town]");//우측 town상세구역
        let detailCity = document.querySelectorAll("[left-btn-attr=detail-city]");//좌측 city구역


        //1-1. 전체 선택 해제. (파란글씨 해제 - city)
        for(let i = 0; i < detailCity.length; i++) {
            detailCity[i].classList.remove('Locations_currentParent__Yi84n');//좌측 city구역
        }
        //1-2. 전체 선택 해제. (파란글씨 해제 - town)
        for(let i = 0; i < detailTown.length; i++) {
            detailTown[i].classList.remove('Locations_selected__1YaAW');//우측 town 상세구역
        }


        //2-1. selectedCity(state에 쌓인거 만큼) 파란색되어지게 가공.
        selectedCity.forEach((city) => {
            let elementCity = document.getElementsByClassName(city)[0];
        
            //좌측 City
            if(elementCity?.className === `${city} Locations_currentParent__Yi84n`) return;
            else elementCity?.classList.toggle('Locations_currentParent__Yi84n')
        });
        //2-2. selectedTown(state에 쌓인거 만큼) 파란색되어지게 가공.
        selectedTown.forEach((town) => {
            let elementTown = document.getElementsByClassName(town)[0];

            //우측 Town ==을 ===로 바꿈
            if(elementTown?.className === `${town} Locations_selected__1YaAW`) return;
            else elementTown?.classList.toggle('Locations_selected__1YaAW')
        });


    });//useEffect

    return ReactDOM.createPortal(
        <>
        
        <div style={modalStyle}>
            {/* {children} */}

            <div
                className="Modal_modalContent__0zuTn LocationsPopup_container___6zbz LocationsPopup_hasSelectedLocationArea__Uicwe">
                <div className="ModalHeader Header_Header__0d6dF">
                    <button type="button" 
                            className="LocationsPopup_ResetButton__Ko46W" 
                            onClick={resetSelectedAll}>
                        <i className="icon-refresh">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 18 14"
                                xmlns="https://www.w3.org/2000/svg">
                                <path
                                    d="M16 6h-6l2.243-2.243c-1.133-1.133-2.64-1.757-4.243-1.757s-3.109 0.624-4.243 1.757c-1.133 1.133-1.757 2.64-1.757 4.243s0.624 3.109 1.757 4.243c1.133 1.133 2.64 1.757 4.243 1.757s3.109-0.624 4.243-1.757c0.095-0.095 0.185-0.192 0.273-0.292l1.505 1.317c-1.466 1.674-3.62 2.732-6.020 2.732-4.418 0-8-3.582-8-8s3.582-8 8-8c2.209 0 4.209 0.896 5.656 2.344l2.343-2.344v6z"
                                    fill="#999999"></path>
                            </svg>
                        </i>초기화
                    </button>
                    <span>지역<span className="FilteredCount_filteredCount__3PCO5">{selectedTown.length}</span>
                    </span>
                    <button type="button" 
                            onClick={ props.noApplyRegionModal }>
                        <svg width="24" height="24" viewBox="0 0 24 24" color="#999">
                            <path
                                fill="currentColor"
                                d="M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"></path>
                        </svg>
                    </button>
                </div>
                <div
                    id="MODAL_BODY"
                    className="ModalBody Body_body__KI0OY LocationsPopup_bodyContainer__FyLa2 LocationsPopup_hasSelectedLocationArea__Uicwe">
                    <div className="Selector_container__tN_Jj">
                        <h6 className="Selector_header__uaMYg">국가(선택불가)</h6>
                        <div className="Selector_select__UG_Cu">
                            <select disabled>
                                <option value="kr">한국</option>
                            </select>
                        </div>
                    </div>
                    <div className="Locations_container__hZ3Ul">
                        <div className="Locations_column__Ibvto">
                            <h6>지역 (수도권 동부만 운영)</h6>
                            <ul>
                                <li>
                                    <button type="button" left-btn-attr="detail-city" className="서울" 
                                    onClick={ nowClickedCity }
                                    >서울</button>
                                </li>
                                <li>
                                    <button type="button" left-btn-attr="detail-city" className="경기" 
                                    onClick={ nowClickedCity }
                                    >경기</button>
                                </li>
                            </ul>
                        </div>
                        <div className="Locations_column__Ibvto">
                            <h6>상세지역</h6>

                            {
                                (selectedCity.length === 0)  ?          //selectedCity.length === 0 && currentTown === "" 
                                        <div className="Locations_empty__c0Xdq">
                                            지역을 선택하면
                                            <br/>
                                            상세 지역을 확인할 수 있습니다.
                                        </div>
                                    :  
                                        <ul>
                                            {listOfTown.map((town, i) => (
                                                
                                                <li key={i}>
                                                    <button 
                                                        right-btn-attr="detail-town"
                                                        onClick={nowClickedTown} 
                                                        key={i}
                                                        type="button" 
                                                        className={town}
                                                        >{town}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                            }
                
                        </div>
                    </div>
                </div>
                <div className="CommonFooter_container__PQC4V LocationsPopup_footerContainer__49FsP LocationsPopup_hasSelectedLocationArea__Uicwe">
                    <div className="SelectedLocations_selectedLocations__6PVR9">
                        <ul className="SelectedLocations_listContainer__46isv hidden-xs">

                        {selectedTown.map((town, i) => (
                                                
                            <li key={i} onClick={removeTag} className="SelectedLocations_locationItem__8j9AK">
                                <span 
                                    key={i}
                                    type="button" 
                                    className={town}
                                    >{town}
                                </span>
                                <svg className="SelectedLocations_selectedLocations__6PVR9_svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"></path></svg>
                            </li>

                        ))}

                        </ul> 
                        <p>최대 10개까지 선택 가능합니다.</p>
                    </div>
                    <button
                        className="CommonFooter_button__sCywr"
                        onClick={ applyRegion }
                        type="submit">적용하기</button>
                </div>
            </div>


            {/* <button onClick={townModalOpen}>닫기</button> */}
                            
        </div>
        <div style={overlayStyle}></div>

         </>,
         document.getElementById("modal")
    );
};

export default RegionModal;