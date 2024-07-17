import { useEffect, useState } from "react";
import ResultModal from "../common/ResultModal";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoSignUp } from "../../api/kakaoApi";
import { setCookie } from "../../util/cookieManager";

const initState = {
    userId: '',
    Password: '',
    name: '',
    phone: '',
    address: {
        postcode: '',
        basic_address: '',
        detail_address: ''
    },
    role: ''
}

const KakaoSignUpComponent = () => {
    const [member, setMember] = useState(initState)
    const [errors, setErrors] = useState({...initState})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const {state} = useLocation()
    const memberInfo = state.memberInfo

    useEffect(() => {
        if (memberInfo.userId) {
            setMember({
                userId: memberInfo.userId,
                password: '',
                name: memberInfo.name,
                phone: '',
                address: {
                    postcode: '',
                    basic_address: '',
                    detail_address: ''
                },
                role: memberInfo.role
            });
        }
    }, [memberInfo]);

    const handleChangeMember = (e) => {
        const {name, value} = e.target

        const updatedMember = {...member}

        if (name.includes("address.")) {
            const addressField = name.split(".")[1];
            updatedMember.address = {...member.address, [addressField]: value}
        } else {
            updatedMember[name] = value
        }

        setMember(updatedMember)
        validateField(name, value)

    }

    const handleClickSignUp = () => {
        kakaoSignUp(member).then(data => {
            setIsModalOpen(true)
            setMember({...initState})
            console.log("member accessToken: ", data.accessToken)
            console.log("member refreshToken: ", data.refreshToken)
            setCookie("member", JSON.stringify(data), 1)
        }).catch(e => {
            console.log(e)
        })
    }

    const closeModal = () => {
        setIsModalOpen(false)
        navigate('/member/login')
    }

    const validateField = (fieldName, value) => {
        let error = '';

        switch(fieldName) {
            case 'password':
                if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(value)) {
                    error = '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함하여 8-20자여야 합니다';
                }
                break;
            
            case 'name':
                if (!/^[가-힣]{1,10}$/.test(value)) {
                    error = '이름은 한글 1자에서 10자까지 입력 가능합니다';
                }
                break;
                
            case 'phone':
                if (!/^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/.test(value)) {
                    error = '올바른 전화번호를 입력하세요 (000-0000-0000)';
                }
                break;

            case 'address.postcode':
                if (!/^\d{5}$/.test(value)) {
                    error = '우편번호는 5자리 숫자여야 합니다.';
                }
                break;

            default:
                break;    
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: error
        }));
    }

    return (
        <div className="border-2 border-blue-300 p-4 w-2/3">
            {isModalOpen ? <ResultModal content={'회원가입이 완료되었습니다'} callbackFn={closeModal}/> : <></>}
            <div className="flex justify-center">
                <div className="text-2xl m-2 text-sky-400 font-bold">회원정보 입력</div>
            </div>

            <div className="flex flex-col mt-10">
                <div className="relative">
                    <input className={`w-full p-3 border rounded-md`}
                    name="userId"
                    type="text"
                    value={member.userId || ''}
                    placeholder="아이디"
                    onChange={handleChangeMember}
                    disabled></input>
                </div>
            </div>

            <div className="flex flex-col mt-1">
                <input className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="password"
                type="password"
                value={member.password || ''}
                placeholder="비밀번호는 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 포함하여 8-20자여야 합니다."
                onChange={handleChangeMember}></input>

            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="flex flex-col mt-1">
                <input className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="name"
                type="text"
                value={member.name || ''}
                placeholder="이름"
                onChange={handleChangeMember}></input>

            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="flex flex-col mt-1">
                <input className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="phone"
                type="tel"
                value={member.phone || ''}
                placeholder="휴대폰 번호 (000-0000-0000)"
                onChange={handleChangeMember}></input>

            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="flex flex-col mt-1">
                <input className={`w-full p-3 border ${errors.address.postcode ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="address.postcode"
                type="number"
                value={member.address.postcode || ''}
                placeholder="우편번호 5자리"
                onChange={handleChangeMember}></input>

            {errors.address.postcode && <p className="text-sm text-red-500 mt-1">{errors.address.postcode}</p>}
            </div>

            <div className="flex mt-1">
                <input className="w-full p-3 border border-gray-300 rounded-md"
                name="address.basic_address"
                type="text"
                value={member.address.basic_address || ''}
                placeholder="기본 주소"
                onChange={handleChangeMember}></input>
            </div>

            <div className="flex mt-1">
                <input className="w-full p-3 border border-gray-300 rounded-md"
                name="address.detail_address"
                type="text"
                value={member.address.detail_address || ''}
                placeholder="상세 주소"
                onChange={handleChangeMember}></input>
            </div>

            <div className="flex justify-center mt-3">
                <button 
                    className="flex justify-center items-center w-80 rounded p-3 bg-blue-500 text-xl text-white font-bold"
                    onClick={handleClickSignUp}>
                    가입하기
                </button>
            </div>

        </div>
    )
}

export default KakaoSignUpComponent