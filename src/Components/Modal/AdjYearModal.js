import ReactSlider from 'react-slider'
import React from "react";
// import ReactDOM from "react-dom";

import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeYear } from '../../store';


const AdjYearModal = (props) => {
    
    //store 데이터 로드
    const yearFromStore = useSelector((state) => state.yearSearchValues );

    //모달창 내용 적용 props
    const propsApplyYearModal = props.applyYearModal;

    const dispatch = useDispatch();//store에 갖다놓기위한 준비
    
    //adj안에서만 사용하는 state 변수. [0]:startYear [1]:endYear [2]:yearText
    const [currentValue, setCurrentValue] = useState([yearFromStore[0],yearFromStore[1],yearFromStore[2]]);
 
    //조건에 따른 연차 string
    function modifySetCurrentValue(value2) {
        let startYear = value2[0];
        let endYear = value2[1];
        let yearText = "";
        if(startYear === 0 && endYear === 10) {
            yearText = `전체`
        }
        if(startYear !== 0 && endYear === 10) {
            yearText = ` ${startYear}년 이상 ~ ${endYear}년 이상`
        }
        if(startYear === 0 && endYear !== 10) {
            yearText = `신입 ~ ${endYear}년 이상`
        }
        if(startYear !== 0 && endYear !== 10) {
            yearText = `${startYear}년 이상 ~ ${endYear}년 이하`
        }
        setCurrentValue([startYear,endYear,yearText]);
    }

    //적용하기: 모달내용 store에 dispatch 후 props 통해 모달 닫음
    function applyCurrentValue2ToStore() {
        dispatch(changeYear(currentValue));
        propsApplyYearModal();
    }

    return (
        
        <section className="YearsPopup_container___s3Uf modal-year__hidden">
            <header className="Header_Header__TyIdy">
                <div className="Header_Header__range__dyhFb">
                    <span className='Button_Button__label__1Kk0v'>
                        {currentValue[2]}
                    </span> {/*신입~10년 문구*/}
                    
                </div>
            </header>

            {/* follow Doc > https://zillow.github.io/react-slider/ 
                             https://retool.com/blog/building-a-react-slider/  */}
            <ReactSlider
                className="customSlider"
                thumbClassName="customSlider-thumb"
                trackClassName="customSlider-track"
                defaultValue={ [ currentValue[0], currentValue[1] ] }
                max={10}
                min={0}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                pearling
                minDistance={1}
                value={[ currentValue[0], currentValue[1] ]}
                onAfterChange={(value) => modifySetCurrentValue(value)}
            />
            
            <hr className="Divider_Divider__root__f2LD0"></hr>
            <footer className="Footer_Footer__xQYVu">
                <div className="Footer_Footer__btnBox__U8lwy">
                    <button onClick={ props.noApplyYearModal }
                        className="Button_Button__root__V1ie3 Button_Button__text__GCOTx Button_Button__textSecondary__xJyp3 Button_Button__sizeSmall__F4Gsg Footer_Footer__btnBox__cancle__Kf9Kv">
                        <span className="Button_Button__label__1Kk0v">
                            취소
                        </span>
                    </button>
                    <button onClick={ applyCurrentValue2ToStore }
                        className="Button_Button__root__V1ie3 Button_Button__text__GCOTx Button_Button__textPrimary__hcFzK Button_Button__sizeSmall__F4Gsg">
                        <span className="Button_Button__label__1Kk0v">
                            적용하기
                        </span>
                    </button>
                </div>
            </footer>
        </section>
    );
}

export default AdjYearModal;