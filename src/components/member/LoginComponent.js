import { useState } from "react"
import kakao from '../../img/kakao_login.png';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../../slices/loginSlice";

const initState = {
    userId: '',
    password: ''
}

const LoginComponent = () => {

    const [loginParam, setLoginParam] = useState({...initState})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value

        setLoginParam({...loginParam})
    }

    const handleClickLogin = (e) => {
        
        dispatch(loginPostAsync(loginParam))
        .unwrap()
        .then(data => {
            console.log("after unwrap....")
            console.log(data)
            if(data.error) {
                alert("아이디와 패스워드를 다시 확인하세요")
            }else {
                alert("로그인 성공")
                navigate({pathname:'/'}, {replace:true})
            }
        })
    }

    return (
        <div className="border-2 border-green-300 p-4 w-96">
            <div className="flex justify-center">
                <div className="text-3xl m-4 p-4 text-emerald-400 font-bold">My Shop</div>
            </div>

            <div className="flex justify-center mt-3">
                <input className="w-80 p-3 border border-gray-300 rounded-md"
                name="userId"
                type="{'text'}"
                value={loginParam.userId}
                placeholder="아이디"
                onChange={handleChange}></input>
            </div>

            <div className="flex justify-center">
                <input className="w-80 p-3 border border-gray-300 rounded-md"
                name="password"
                type="password"
                value={loginParam.password}
                placeholder="비밀번호"
                onChange={handleChange}></input>
            </div>

            <div className="flex justify-between mt-2">
                <button className="text-gray-400 text-sm ml-4">
                    아이디/비밀번호 찾기
                </button>
                
                <Link to={'/member/signup'}>
                    <button className="text-sm mr-4">
                        회원가입
                    </button>
                </Link>
            </div>

            <div className="flex justify-center mt-12">
                <button 
                    className="flex justify-center items-center w-80 rounded p-3 bg-blue-500 text-xl text-white font-bold"
                    onClick={handleClickLogin}>
                    로그인
                </button>
            </div>
            <div className="flex justify-center mt-2">
                <button className="w-80 rounded" >
                    <img src={kakao} alt="kakao_login" className="mb-5"/>
                </button>
            </div>
        </div>
    )
}

export default LoginComponent