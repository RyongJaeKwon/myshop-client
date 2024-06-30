import BaseLayout from "../../layout/BaseLayout"

const LoginPage = () => {
    return (
        <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
            <BaseLayout/>

            <div className="flex justify-center items-center">
                <div className="text-2xl">
                    Login Page
                </div>
            </div>
        </div>
    )
}

export default LoginPage;