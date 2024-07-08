import React, { useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import { itemPost } from "../../api/itemApi";
import ResultModal from "./ResultModal";

const initState = {
    itemName: "",
    color: "",
    size: "",
    itemInfo: "",
    price: 0,
    brand: "",
    category: '',
    files:[]
}

const ItemModal = ({callbackFn}) => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const uploadRef = useRef()
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)
    const [formData, setFormData] = useState({...initState});

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
    };

    const handleChange = (e) => {
        formData[e.target.name] = e.target.value
        setFormData({...formData})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const files = uploadRef.current.files
        const data = new FormData();
        for(let i=0; i<files.length; i++){
            data.append("files", files[i])
        }

        data.append("category", formData.category);
        data.append("itemName", formData.itemName);
        data.append("size", formData.size);
        data.append("color", formData.color);
        data.append("itemInfo", formData.itemInfo);
        data.append("price", formData.price);
        data.append("brand", formData.brand);

        
        await itemPost(data).then(() => {
            setIsResultModalOpen(true)
            setFormData({...initState})
        }).catch(e => {
            console.log(e)
        })
    };

    return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                {isResultModalOpen ? <ResultModal content={'상품 등록이 완료되었습니다'} callbackFn={callbackFn}/> : <></>}
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl h-full max-h-screen overflow-auto"
                style={{ width: "600px", height: "650px" }}
            >
                <h2 className="text-2xl font-bold mb-4">MyShop</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        카테고리
                    </label>
                    <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">

                        <option value="">-- 선택 --</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="hat">Hat</option>
                        <option value="shoes">Shoes</option>
                        <option value="outer">Outer</option>
                        <option value="bag">Bag</option>
                        <option value="acc">Acc</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        사진 업로드
                    </label>
                    <input
                        type="file"
                        multiple={true}
                        ref={uploadRef}
                        onChange={handleFileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <div className="mt-2 flex space-x-2 overflow-auto">
                        {previews.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`preview-${index}`}
                            className="h-20 w-20 object-cover"
                        />
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        아이템 이름
                    </label>
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        사이즈
                    </label>
                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        색상
                    </label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        아이템 정보
                    </label>
                    <textarea 
                        name="itemInfo"
                        value={formData.itemInfo}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        가격
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        브랜드
                    </label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded-md"
                        onClick={callbackFn}
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        등록
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
};

export default ItemModal;