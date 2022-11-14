import axios from 'axios'
import AdjYearModal from '../Components/Modal/AdjYearModal';
import { useState } from 'react';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeDetailData, isSearched } from '../store'
// import { changeYear } from '../store';
import RegionModal from '../Components/Modal/RegionModal'

const Navi = () => {


    const dispatch = useDispatch();// store에 갖다놓으려면 일단있어야함


    /* 지역선택 모달창 */
    const regionFromStore = useSelector((state) => state.regionSearchValues );
    const [isOpen, setIsRegionOpen] = useState(false);
    const regionModalOpen = () => { 
        setIsRegionOpen(!isOpen); 
    };

    const applyRegionModal = () => {
        setIsRegionOpen(false);
        // document.getElementById('yearInnerText').innerHTML = yearFromStore.yearText;
    }
    const noApplyRegionModal = () => {
        setIsRegionOpen(false);
    }/* ~연차선택 모달창 */



    /* 연차선택 모달창 */
    const yearFromStore = useSelector((state) => state.yearSearchValues );
    const [isYearOpen, setIsYearOpen] = useState(false);
    const yearModalOpen = () => {
        setIsYearOpen(true); 
    };
    const applyYearModal = () => {
        setIsYearOpen(false);
        // document.getElementById('yearInnerText').innerHTML = yearFromStore.yearText;
    }
    const noApplyYearModal = () => {
        setIsYearOpen(false);
    }/* ~연차선택 모달창 */


    return (
        <div className="navi">
        {/* <button onClick={()=>{console.log('테스트')}}>테스트용버튼</button> */}
            <div className="navi__dev">
            
                {/* 개발 개발전체 */}
                <div className="navi__dev-body">
                    <div>
                        <button
                            className="navi__dev-btn1 btn-disable"
                            type="button">
                            <span className="navi__dev--title1">개발</span>
                            <span
                                className="navi__dev--vbtn">
                                <svg
                                    xmlns="https://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12">
                                    <path
                                        fill="#767676"
                                        fillRule="nonzero"
                                        d="M2.28 3.22a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L6 6.94 2.28 3.22z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className="navi__dev-bodySub btn-disable">
                        <button
                            type="button"
                            className="navi__dev-btn1 btn-disable">
                            <span className="navi__dev--title2">개발 전체</span>
                            <span
                                className="navi__dev--vbtn">
                                <svg
                                    xmlns="https://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12">
                                    <path
                                        fill="#767676"
                                        fillRule="nonzero"
                                        d="M2.28 3.22a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L6 6.94 2.28 3.22z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>



            {/* 지역 경력 기술스택 최신순 */}
            <div className='nav__filter'>
                <div className="nav__filter-body">
                    <div className="nav__filter-btns">
                        <button
                            onClick={regionModalOpen}
                            type="button"
                            className="nav__btn btn-enable">
                            <span className="nav__btn--title">
                                지역
                                <span className="nav__btn--count nav__btn--size">
                                    { regionFromStore.townQty }
                                </span>
                            </span>
                            <span className="nav__btn--blue">{ regionFromStore.townETCKOR }
                            </span>
                        </button>
                        {
                            isOpen === true ? <RegionModal
                            applyRegionModal = { applyRegionModal }
                            noApplyRegionModal = { noApplyRegionModal }
                            >
                            </RegionModal> : null
                        }

                        <div className="nav__test1" id="yearBar">
                            <button 
                                id="yearBar"
                                type="button"
                                className="nav__btn btn-enable rotation"
                                onClick={yearModalOpen}>
                                <span className="nav__btn--title">경력</span>
                                <span className="nav__btn--blue padding-right">
                                    <span id='yearInnerText'>{ yearFromStore[2] }</span>
                                </span>{/*신입~10년 문구*/}
                                <svg
                                    width="8"
                                    height="7"
                                    xmlns="https://www.w3.org/2000/svg">
                                    <path
                                        d="M7.33334 0.494202C7.85691 0.494202 8.14842 1.1611 7.82205 1.61224L4.50038 6.20371C4.25071 6.54882 3.77503 6.54971 3.5243 6.20554L0.179295 1.61408C-0.149094 1.16332 0.14211 0.494202 0.666672 0.494202H7.33334Z"
                                        fill="#333333"></path>
                                </svg>
                            </button>
                            {
                                isYearOpen === true ?
                                    <AdjYearModal 
                                        applyYearModal = { applyYearModal }
                                        noApplyYearModal = { noApplyYearModal } 
                                        >
                                    </AdjYearModal> : null
                            }
                        </div>


                        <button
                            type="button"
                            className="nav__btn">
                            <span className="nav__btn--title btn-disable">기술스택</span>
                            <span className="nav__btn--blue"></span>
                            <svg className="btn-disable"
                                width="8"
                                height="7"
                                xmlns="https://www.w3.org/2000/svg">
                                <path
                                    d="M7.33334 0.494202C7.85691 0.494202 8.14842 1.1611 7.82205 1.61224L4.50038 6.20371C4.25071 6.54882 3.77503 6.54971 3.5243 6.20554L0.179295 1.61408C-0.149094 1.16332 0.14211 0.494202 0.666672 0.494202H7.33334Z"
                                    fill="#b1b1b1"></path>
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="nav__btn">
                            <span className="nav__btn--title btn-disable">최신순</span>
                            <span className="nav__btn--blue"></span>
                            <svg
                                width="8"
                                height="7"
                                xmlns="https://www.w3.org/2000/svg">
                                <path
                                    d="M7.33334 0.494202C7.85691 0.494202 8.14842 1.1611 7.82205 1.61224L4.50038 6.20371C4.25071 6.54882 3.77503 6.54971 3.5243 6.20554L0.179295 1.61408C-0.149094 1.16332 0.14211 0.494202 0.666672 0.494202H7.33334Z"
                                    fill="#b1b1b1"></path>
                            </svg>
                        </button>
                        <button 
                            className="nav__btn btn-enable nav__btn--search"
                            onClick={() => {
                            const host = process.env.REACT_APP_HOST;
                            const url = //default value
                                // "http://localhost:18080/api/main/jobs?country=kr&job_sort=job.latest_order";
                                `http://${host}/api/main/jobs?country=kr&job_sort=job.latest_order`;
                            var params = new URLSearchParams();
                            // params.append("locationList", "seoul.gangdong-gu");

                            //regionFromStore.townUrlParam[] 만큼 반복돌리면됨. 여기 js라서 니 편한대로함. 
                            if (regionFromStore.townQty === 0) { params.append("locationList", "all"); }

                            for(let i = 0; i < regionFromStore.townQty; i++) {
                                params.append("locationList", regionFromStore.townUrlParam[i]);
                                // console.log(regionFromStore.townUrlParam[i]);
                            }
                            // params.append("locationList", "seoul.songpa-gu");

                            params.append("yearList", yearFromStore[0]);
                            // console.log(yearFromStore[0]);
                            params.append("yearList", yearFromStore[1]);
                            // console.log(yearFromStore[1]);
                            params.append("userId", "123");
                            params.append("offset", "20");
                            params.append("limit", "10");

                           
                            var request = {
                                params: params
                            };
                            axios.get(url, request).then((결과) => {

                                /* lat lng String -> KV 변환 */
                                for(let k = 0; k < 결과.data.data.length; k++){
                                    let obj = {};
                                    결과.data.data[k].location.replace(/(\w+)=(\d+\.\d+)/g, function (_, key, val) {
                                        obj[key] = parseFloat(val);
                                    });
                                    결과.data.data[k].location = obj;
                                    // console.log(결과.data.data[k].location);
                                }

                                dispatch(changeDetailData(결과.data));
                                dispatch(isSearched("search"))
                            })
                                .catch(() => {
                                    console.log('실패함')
                                })
                            }}>
                            <div>
                                <span>검색하기</span>
                                
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="line"></div>
        </div>
    );
}

export default Navi;