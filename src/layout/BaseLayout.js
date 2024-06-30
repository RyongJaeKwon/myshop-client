import CategoryNav from "./CategoryNav";
import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = ({children}) => {
    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-screen-xl px-4 md:px-8 lg:px-20">
                <Header/>
                <hr className="my-4 border-gray-800"/>
                <CategoryNav/>
                <div className="bg-white shadow-sm border border-gray-100 min-h-screen">
                    {children}
                </div>
                
                <Footer/>
            </div>
        </div>
    )
}

export default BaseLayout;