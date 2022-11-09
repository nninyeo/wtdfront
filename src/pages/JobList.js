import { useSelector, useDispatch } from "react-redux";
import { changeDetailData, mutationRightList } from '../store'

const JobList = () => {
    const dispatch = useDispatch();
    const DetailDataMap = useSelector((state) => state.DetailData );
    const rightList = useSelector((state) => state.mutationList );

    const seeDetailCard = (i, e) => {
        let mouseChangeTarget = JSON.parse(JSON.stringify(DetailDataMap));
        for(let g = 0; g < DetailDataMap.data.length; g++){
            mouseChangeTarget.data[g].clicked = "noclicked";
        }
        
        if(DetailDataMap.data[i].clicked === "clicked"){
            mouseChangeTarget.data[i].clicked = "noclicked";
        } else {
            mouseChangeTarget.data[i].clicked = "clicked";
        }

        dispatch(changeDetailData(mouseChangeTarget));
        
        //louis. 회사목록 클릭에 따른 변이(뮤테이션) 실행
        let prvIndex = rightList.prvIndex;
        let clickedData = {
            "index": i,
            "prvIndex": prvIndex
        }

        dispatch(mutationRightList(clickedData));
        
        //div 스크롤 이동시키기
        document.querySelector('.detail').scrollTo(0, i * 80);
    }

    const addColorOnCard = (i, e) => {
        let mouseChangeTarget = JSON.parse(JSON.stringify(DetailDataMap));
        
        if(DetailDataMap.data[i].clicked !== "clicked"){
            mouseChangeTarget.data[i].mouse = "hover";
        }

        dispatch(changeDetailData(mouseChangeTarget));
    }

    const removeColorOnCard = (i, e) => {
        let mouseChangeTarget = JSON.parse(JSON.stringify(DetailDataMap));
        let detailDataMap = DetailDataMap.data[i]
        
        if(detailDataMap.clicked !== "clicked"){
            if(detailDataMap.mouse === "hover"){
                mouseChangeTarget.data[i].mouse = "out";
            }
        }

        dispatch(changeDetailData(mouseChangeTarget));
    }

    const removeCard = (i, e) => {
        e.stopPropagation()//event전파방지
        
        let spliceTarget = [...DetailDataMap.data]
        let removed = spliceTarget.splice(i,1);
        let spliced = { data: spliceTarget};
        console.log("게시물ID:" + removed[0].id + " (" + removed[0].position + ")가 삭제됨")
        
        dispatch(changeDetailData(spliced));
    }

    const Item = ({ text }) => {
        return <p>
          {text.split("\n").map((txt, i) => (
              <>
                {txt}
                <br/>
              </>
            ))}
        </p>;
    };

    return (
        <div>
            <div className="detail">
                { DetailDataMap.data.map((data, i) => (  // 맵함수를 이용해 dummy 안의 days 그룹 내의 원소를 검색한다.
                    <div key={data.id}
                         className= { (data.mouse === "hover" ? "addColorOnCard" : "") }>
                    <div 
                        className="card__case"
                        onClick={(e) => { seeDetailCard(i, e) }}
                        onMouseOver={(e) => { addColorOnCard(i, e) }}
                        onMouseOut={(e) => { removeColorOnCard(i, e) }}
                    >
                        <div className="card__thumb">   
                            <img className="card__thumb__img" alt="thumb392" src={data.thumb} />
                        </div>
                        <div className="card__texts"> mouse: {data.mouse} / clicked: {data.clicked}
                            <div className="card__posision">
                                {data.position} 
                            </div>
                            <div className="card__small__area">
                                <div className="card__small__company">
                                    {data.company}
                                </div>
                                <div className="card__small__delete btn"
                                    onClick={(e) => removeCard(i, e)}
                                    >
                                    안보기 ❌
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 열린디테일~ */}
                    <div className={
                        (data.clicked === "clicked" ? "card__case2" : "card__case2 hide")
                    }
                        id={data.id}>
                        <div className="card__case2__3door">
                            <div>상태: {data.status}</div>
                            <div>게시물ID: {data.id}</div>
                            <div>마감일:{data.dueTime}</div>
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