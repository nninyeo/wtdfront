// import axios from 'axios'

// import { DetailData } from '../store'
import { useSelector } from "react-redux";

const TestFooter = () => {

    const DetailDataMap = useSelector((state) => state.DetailData );
    debugger;

    return (
        <div className="footer">
            {/* <button onClick={()=>{console.log(a.data)}}>테스트용버튼</button> */}
            <span className="testFooterSpan1">백에서 받아온 결과데이터: </span>
            
                       
            <ul>
            {DetailDataMap.data.map((data, i) => (  // 맵함수를 이용해 dummy 안의 days 그룹 내의 원소를 검색한다.
                <li
                    className="testFooterDatas"
                    key={i}>
                        <span className="tab"> 아이디: {data.id}, &#9; </span>
                        <span className="tab"> 회사명: {data.company}, &#9; </span>
                        <span className="tab"> 포지션: {data.position}, &#9;  </span>
                        <span className="tab"> 지역: {data.address}, </span>
                </li>
            ))}
            </ul>

        </div>
    );
}

export default TestFooter; 


