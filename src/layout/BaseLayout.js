import { useLocation } from "react-router-dom";
import CategoryNav from "./CategoryNav";
import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = ({children, toggleRefresh}) => {
    
    const location = useLocation();
    const isLoginPage = location.pathname === '/member/login'
    const isLoginForm = location.pathname === '/member/signup'
    const isUpdateForm = location.pathname === '/member/kakaoSignup'

    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-screen-xl px-4 md:px-8 lg:px-20">
                <Header/>
                <hr className="my-4 border-gray-800"/>
                {!isLoginPage && !isLoginForm && !isUpdateForm ? <CategoryNav toggleRefresh={toggleRefresh}/> : <></>}
                <div className="min-h-screen">
                    {children}
                </div>
                
                {!isLoginPage && !isLoginForm ? <Footer/> : <></>}
            </div>
        </div>
    )
}

export default BaseLayout;