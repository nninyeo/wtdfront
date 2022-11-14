// import axios from 'axios'
import { useState } from 'react';
import LoginModal from '../Components/Modal/LoginModal'
import { CodeOutlined } from '@ant-design/icons';

const Header = () => {

const [isOpen, setIsOpen] = useState(false);
const loginModalOpen = () => { setIsOpen(!isOpen); };

    
    return (
        <div className="header">
            <div className="header__subject">
                <h3 className="stop-dragging"><CodeOutlined style={{ fontSize: '16px', color: '#ffd400' }} /> 원티드 채용 지도로보기 </h3> 
            </div>
            <div className="header__btn-case">
            <span className="stop-dragging" style={{cursor:'pointer'}} onClick={() => window.open("https://www.wanted.co.kr/wdlist/518?country=kr&job_sort=company.response_rate_order&years=0&years=1&locations=seoul.all")} >원티드로이동(새창) </span>
                {/* <span className="btn header__btn">userInfo</span> */}
                <span className="btn header__btn stop-dragging"  style={{cursor:'pointer'}} onClick={loginModalOpen} >Join/Login</span>
                {
                    isOpen === true ? <LoginModal>
                    <h3>로그인화면 구현예정</h3>
                    <button onClick={loginModalOpen}>닫기</button>
                    </LoginModal> : null
                }
                {/* <span className="btn header__btn">Setting</span> */}
                
            </div>
        </div>
        
    );
}

export default Header; 