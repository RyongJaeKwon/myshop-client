import { useState } from "react"
import { emailCheck, memberSignUp, useridCheck } from "../../api/memberApi"
import ResultModal from "../common/ResultModal"
import { useNavigate } from "react-router-dom"

const initState = {
    userId: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    address: {
        postcode: '',
        basic_address: '',
        detail_address: ''
    }
}

const SignUpComponent = () => {
    
    const [member, setMember] = useState({...initState})
    const [errors, setErrors] = useState({...initState})
    const [userIdValid, setUserIdValid] = useState(null)
    const [emailValid, setEmailValid] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

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

    const handleUserIdCheck = async () => {
        const res = await useridCheck(member.userId)
            
        if (res.message === '사용 가능한 아이디 입니다') {
            setUserIdValid(true)
            setErrors({...errors, userId: ''})
        } else {
            setUserIdValid(false)
            setErrors({...errors, userId: res.message})
        }
    }

    const handleEmailCheck = async () => {
        const res = await emailCheck(member.email)

        if (res.message === '사용 가능한 이메일 입니다') {
            setEmailValid(true)
            setErrors({...errors, email: ''})
        } else {
            setEmailValid(false)
            setErrors({...errors, email: res.message})
        }
    }

    const handleClickSignUp = () => {
        if (!userIdValid) {
            handleUserIdCheck()
            if (!userIdValid) return
        }

        if (!emailValid) {
            handleEmailCheck()
            if (!emailValid) return
        }

        memberSignUp(member).then(() => {
            setIsModalOpen(true)
            setMember({...initState})
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
            case 'userId':
                if(!/^[a-zA-Z0-9]{5,12}$/.test(value)) {
                    error = '아이디는 영문 대소문자, 숫자로 구성된 5-12자까지 입력 가능합니다'
                }
                break;

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

            case 'email':
                if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{3}$/.test(value)) {
                    error = '올바른 이메일 주소를 입력하세요';
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
                    <input className={`w-4/5 p-3 border ${errors.userId ? 'border-red-500' : userIdValid === true ? 'border-gray-300' : 'border-gray-300'} rounded-md`}
                    name="userId"
                    type="text"
                    value={member.userId}
                    placeholder="아이디"
                    onChange={handleChangeMember}></input>
                    
                    {userIdValid === true && <p className="text-sm text-green-500 mt-1">사용 가능한 아이디 입니다</p>}
                    {errors.userId && <p className="text-sm text-red-500 mt-1">{errors.userId}</p>}
                    <button 
                        className="absolute right-0 top-0 px-4 py-3 bg-blue-500 text-white font-bold border border-gray-300 rounded-md"
                        onClick={handleUserIdCheck}
                    >
                        중복확인
                    </button>
                </div>
            </div>

            <div className="flex flex-col mt-1">
                <input className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="password"
                type="password"
                value={member.password}
                placeholder="비밀번호는 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 포함하여 8-20자여야 합니다."
                onChange={handleChangeMember}></input>

            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="flex flex-col mt-1">
                <input className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="name"
                type="text"
                value={member.name}
                placeholder="이름"
                onChange={handleChangeMember}></input>

            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="flex flex-col mt-1">
                <div className="relative">
                    <input className={`w-4/5 p-3 border ${errors.email ? 'border-red-500' : emailValid === true ? 'border-gray-300' : 'border-gray-300'} rounded-md`}
                    name="email"
                    type="email"
                    value={member.email}
                    placeholder="이메일"
                    onChange={handleChangeMember}></input>
                    
                    {emailValid === true && <p className="text-sm text-green-500 mt-1">사용 가능한 이메일 입니다</p>}
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    <button 
                        className="absolute right-0 top-0 px-4 py-3 bg-blue-500 text-white font-bold border border-gray-300 rounded-md"
                        onClick={handleEmailCheck}
                    >
                        중복확인
                    </button>
                </div>
            </div>

            <div className="flex flex-col mt-1">
                <input className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="phone"
                type="tel"
                value={member.phone}
                placeholder="휴대폰 번호 (000-0000-0000)"
                onChange={handleChangeMember}></input>

            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="flex flex-col mt-1">
                <input className={`w-full p-3 border ${errors.address.postcode ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="address.postcode"
                type="number"
                value={member.address.postcode}
                placeholder="우편번호 5자리"
                onChange={handleChangeMember}></input>

            {errors.address.postcode && <p className="text-sm text-red-500 mt-1">{errors.address.postcode}</p>}
            </div>

            <div className="flex mt-1">
                <input className="w-full p-3 border border-gray-300 rounded-md"
                name="address.basic_address"
                type="text"
                value={member.address.basic_address}
                placeholder="기본 주소"
                onChange={handleChangeMember}></input>
            </div>

            <div className="flex mt-1">
                <input className="w-full p-3 border border-gray-300 rounded-md"
                name="address.detail_address"
                type="text"
                value={member.address.detail_address}
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

export default SignUpComponent