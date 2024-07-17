import { Link } from 'react-router-dom';
import { getKakaoLoginLink } from '../../api/kakaoApi';
import kakao from '../../img/kakao_login.png';

const KakaoLoginComponent = () => {
    const link = getKakaoLoginLink()

    return (
        <div className="flex justify-center mt-2">
            <Link to={link} className="w-80 rounded" >
                <img src={kakao} alt="kakao_login" className="mb-5"/>
            </Link>
        </div>
    )
}

export default KakaoLoginComponent