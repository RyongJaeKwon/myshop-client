import { Outlet } from "react-router-dom"
import BaseLayout from "../../layout/BaseLayout"

const IndexPage = () => {
    return (
        <BaseLayout>
        <div className="flex flex-wrap w-full">
                <Outlet/>
        </div>
        </BaseLayout>
    )
}

export default IndexPage