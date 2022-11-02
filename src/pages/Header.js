// import axios from 'axios'
import { useState } from 'react';
import LoginModal from '../Components/Modal/LoginModal'

const Header = () => {

const [isOpen, setIsOpen] = useState(false);
const loginModalOpen = () => { setIsOpen(!isOpen); };

    
    return (
        <div className="header">
            <div className="header__subject">
                <h3>원티드 채용 지도로보기</h3> 
            </div>
            <div className="header__btn-case">
                <span className="text header__btn"> welcome USERNAME </span>    
                <span className="btn header__btn">userInfo</span>
                <span className="btn header__btn" onClick={loginModalOpen} >Join/Login</span>
                {
                    isOpen === true ? <LoginModal>
                    <h1>로그인화면!</h1>
                    <button onClick={loginModalOpen}>닫기</button>
                    </LoginModal> : null
                }
                <span className="btn header__btn">Setting</span>
                
            </div>
        </div>
    );
}

export default Header; 