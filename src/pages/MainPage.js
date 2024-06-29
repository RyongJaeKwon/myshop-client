import BaseLayout from "../layout/BaseLayout";
import CategoryNav from "../layout/CategoryNav";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const MainPage = () => {
    return (
        <BaseLayout>
            <CategoryNav/>
            <div className="text-3xl">Main Page</div>
        </BaseLayout>
    )
}

export default MainPage;