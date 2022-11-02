// import axios from 'axios'
//디테일 컨테이너
import { useSelector } from "react-redux";

// console.log("콘솔로그");
// console.log("sdf%d",Navi(yearValue2));

// import { useEffect } from 'react';
// const { kakao } = window;


const JobList = () => {
    // useEffect(() => {
    //     var mapContainer = document.getElementById('myMap'), // 지도를 표시할 div  
    //         mapOption = { 
    //             center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    //             level: 6, // 지도의 확대 레벨
    //             mapTypeId : kakao.maps.MapTypeId.ROADMAP
    //         };

    //     var map = new kakao.maps.Map(mapContainer, mapOption);
    //     debugger;
    //     var positions = [
    //         {
    //             title: '카카오', 
    //             latlng: kakao.maps.LatLng(33.450705, 126.570677)
    //         },
    //         {
    //             title: '생태연못', 
    //             latlng: kakao.maps.LatLng(33.450936, 126.569477)
    //         },
    //         {
    //             title: '텃밭', 
    //             latlng: kakao.maps.LatLng(33.450879, 126.569940)
    //         },
    //         {
    //             title: '근린공원',
    //             latlng: kakao.maps.LatLng(33.451393, 126.570738)
    //         }
    //     ];

    //     var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    //     for (var i = 0; i < positions.length; i ++) {
    //         // 마커 이미지의 이미지 크기 입니다
    //         var imageSize = new kakao.maps.Size(24, 35); 
    //         // 마커 이미지를 생성합니다    
    //         var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    //         // 마커를 생성합니다
    //         var marker = new kakao.maps.Marker({
    //             map: map, // 마커를 표시할 지도
    //             position: positions[i].latlng, // 마커를 표시할 위치
    //             title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //             image : markerImage // 마커 이미지 
    //         });
        
    //     }
    // })

    const DetailDataMap = useSelector((state) => state.DetailData );
    

    //제작중.............................................
//     const handleClick = e => {
//         e.preventDefault();
//         debugger;
//         //e.stopPropagation();       
         
//         console.log(e.target)
//         let cardCaseDiv = e.target
// // debugger;
//         cardCaseDiv.nextElementSibling.classList.toggle('hide')
        
//     }

    const handleClick = (id, e) => {
        document.getElementById(id).classList.toggle("hide"); 
    }

    const Item = ({ text }) => {
        return <p>
          {text.split("\n").map((txt) => (
              <>
                {txt}
                <br />
              </>
            ))}
        </p>;
      };


    return (
        <div>
            <div className="detail">

            {DetailDataMap.data.map((data, i) => (  // 맵함수를 이용해 dummy 안의 days 그룹 내의 원소를 검색한다.
            <div key={data.id}>

                <div className="card__case"
                onClick={(e)=>{handleClick(data.id, e)}}
                >{/* 반복시작 - 닫은디테일 */}
                {/* onClick={handleClick(data.id)} */}
                    
                    <div className="card__thumb">   
                        <img className="card__thumb__img" src={data.thumb} />
                    </div>
                    <div className="card__texts">
                        <div className="card__posision">
                            {data.position}
                        </div>
                        <div className="card__small__area">
                            <div className="card__small__company">
                                {data.company}
                            </div>
                            <div className="card__small__delete btn">
                                지우기버튼
                            </div>
                        </div>
                    </div>
                </div>

                {/* 열린디테일~ */}
                <div className="card__case2 hide" id={data.id}>
                    <div className="card__case2__3door">
                        <div>상태: {data.status}</div>
                        <div>게시물ID: {data.id}</div>
                        <div>마감일: {data.dueTime}</div>
                    </div>
                    <div>
                        <span className="card2__desc__subj">주소</span>
                        <hr></hr>
                        <div className="card2__desc__detail">{data.address}</div>
                    </div>
                    <div>
                        <span className="card2__desc__subj">회사소개</span>
                        <hr></hr>
                        <div className="card2__desc__detail"><Item text={data.detailIntro} /></div>
                    </div>
                    <div>
                        <span className="card2__desc__subj">주요업무</span>
                        <hr></hr>
                        <div className="card2__desc__detail"><Item text={data.detailMain_tasks} /></div>
                    </div>
                    <div>
                        <span className="card2__desc__subj">자격요건</span>
                        <hr></hr>
                        <div className="card2__desc__detail"><Item text={data.detailRequirements} /></div>
                    </div>
                    <div>
                        <span className="card2__desc__subj">우대사항</span>
                        <hr></hr>
                        <div className="card2__desc__detail"><Item text={data.detailPreferred_points} /></div>
                    </div>
                    <div>
                        <span className="card2__desc__subj">혜택 및 복지</span>
                        <hr></hr>
                        <div className="card2__desc__detail"><Item text={data.detailBenefits} /></div>
                    </div>
                    
                </div>
                {/* ~열린디테일 */}
                {/* DetailDataMap.data[0]  */}

            </div>
            ))}

            </div>
            <div className="detail__pagenation">
                페이지네이션자리
            </div>
        </div>
    );
}

export default JobList; 