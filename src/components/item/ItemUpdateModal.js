import React, { useEffect, useRef, useState } from "react";
import { getOne, putOne } from "../../api/itemApi";
import { API_SERVER_HOST } from "../../api/memberApi";
import ResultModal from "../common/ResultModal";

const initState = {
    id: 0,
    itemName: "",
    color: "",
    size: "",
    itemInfo: "",
    price: 0,
    brand: "",
    category: '',
    regDate: '',
    modDate: '',
    files: [],
    uploadFileNames: []
}

const ItemUpdateModal = ({closeUpdateModal, toggleRefresh, itemId}) => {
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const uploadRef = useRef()
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)
    const [item, setItem] = useState({...initState})

    useEffect(() => {
        const getItem = async () => {
            try {
                const data = await getOne(itemId)
                setItem(data)
                setPreviews(data.uploadFileNames.map((fileName) => `${API_SERVER_HOST}/items/view/${fileName}`))
            } catch (error) {
                console.error("error: ", error)
            }
        };

        getItem()
    }, [itemId])

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
    };

    const handleChange = (e) => {
        item[e.target.name] = e.target.value
        setItem({...item})
    };

    const handleClickUpdate = (e) => {
        const files = uploadRef.current.files
        const formData = new FormData()

        for(let i=0; i<files.length; i++){
            formData.append("files", files[i])
        }

        formData.append("category", item.category)
        formData.append("itemName", item.itemName)
        formData.append("size", item.size)
        formData.append("color", item.color)
        formData.append("itemInfo", item.itemInfo)
        formData.append("price", item.price)
        formData.append("brand", item.brand)
        formData.append("id", item.id)

        putOne(itemId, formData).then(data => {
            setIsResultModalOpen(true)
            setItem({...initState})
        }).catch(e => {
            console.log(e)
        })
    };

    const closeResultModal = () => {
        closeUpdateModal()
        toggleRefresh()

    }

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {isResultModalOpen && (
                    <ResultModal content={'상품 수정이 완료되었습니다'} callbackFn={closeResultModal} />
            )}
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl h-full max-h-screen overflow-auto"
                style={{ width: "600px", height: "650px" }}
            >
                <h2 className="text-2xl font-bold mb-4">MyShop</h2>
                <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    카테고리
                </label>
                <select 
                    name="category"
                    value={item.category}
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
                    value={item.itemName}
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
                    value={item.size}
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
                    value={item.color}
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
                    value={item.itemInfo}
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
                    value={item.price}
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
                    value={item.brand}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-md"
                    onClick={closeUpdateModal}
                >
                    취소
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleClickUpdate}
                >
                    수정
                </button>
            </div>
            </form>
        </div>
    </div>
    )

};

export default ItemUpdateModal