import { useState } from "react"

const initState = {
    userid: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    postcode: '',
    basic_address: '',
    detail_address: ''
}

const SignUpComponent = () => {
    
    const [member, setMember] = useState({...initState})
    const [errors, setErrors] = useState({...initState})

    const handleChangeMember = (e) => {
        member[e.target.name] = e.target.value
        setMember({...member})
        validateField(e.target.name, e.target.value)

    }

    const validateField = (fieldName, value) => {
        let error = '';

        switch(fieldName) {
            case 'userid':
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
                if (!/\S+@\S+\.\S+/.test(value)) {
                    error = '올바른 이메일 주소를 입력하세요';
                }
                break;
                
            case 'phone':
                if (!/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(value)) {
                    error = '올바른 전화번호를 입력하세요 (000-0000-0000)';
                }
                break;

            case 'postcode':
                if (!/^\d{5}$/.test(value)) {
                    error = '우편번호는 5자리 숫자여야 합니다.';
                }
                break;

            default:
                break;    
        }

        setErrors({...errors, [fieldName]: error})
    }

    return (
        <div className="border-2 border-green-300 p-4 w-2/3">
            <div className="flex justify-center">
                <div className="text-2xl m-2 text-emerald-400 font-bold">회원정보 입력</div>
            </div>

            <div className="flex flex-col mt-10">
            <div className="relative">
                <input className={`w-4/5 p-3 border ${errors.userid ? 'border-red-500' : 'border-gray-500'} rounded-md`}
                name="userid"
                type="text"
                value={member.userid}
                placeholder="아이디"
                onChange={handleChangeMember}></input>
                
                {errors.userid && <p className="text-sm text-red-500 mt-1">{errors.userid}</p>}
                <button className="absolute right-0 top-0 px-4 py-3 border border-gray-300 rounded-md">
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
                <input className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="email"
                type="email"
                value={member.email}
                placeholder="이메일 (user@example.com)"
                onChange={handleChangeMember}></input>

            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
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
                <input className={`w-full p-3 border ${errors.postcode ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                name="postcode"
                type="number"
                step="1"
                value={member.postcode}
                placeholder="우편번호 5자리"
                onChange={handleChangeMember}></input>

            {errors.postcode && <p className="text-sm text-red-500 mt-1">{errors.postcode}</p>}
            </div>

            <div className="flex mt-1">
                <input className="w-full p-3 border border-gray-300 rounded-md"
                name="basic_address"
                type="text"
                value={member.basic_address}
                placeholder="기본 주소"
                onChange={handleChangeMember}></input>
            </div>

            <div className="flex mt-1">
                <input className="w-full p-3 border border-gray-300 rounded-md"
                name="detail_address"
                type="text"
                value={member.detail_address}
                placeholder="상세 주소"
                onChange={handleChangeMember}></input>
            </div>

            <div className="flex justify-center mt-3">
                <button 
                    className="flex justify-center items-center w-80 rounded p-3 bg-blue-500 text-xl text-white font-bold">
                    가입하기
                </button>
            </div>

        </div>
    )
}

export default SignUpComponent