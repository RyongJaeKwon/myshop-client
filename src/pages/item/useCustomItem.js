import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) => {
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}

const useCustomItem = (category) => {
    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 6)
    const queryDefault = createSearchParams({page, size}).toString()

    const moveToList = (param) => {
        let queryStr = ""

        if(param){
            const pageNum = getNum(param.page, 1)
            const sizeNum = getNum(param.size, 6)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()
        }else {
            queryStr = queryDefault
        }

        navigate({pathname:`/items/${category}`, search:queryStr})
    }

    const moveToRead = (param) => {
        const {category, id, page, size} = param
        let queryStr = ""
        
        if(param){
            const pageNum = getNum(page, 1)
            const sizeNum = getNum(size, 6)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()
        }else {
            queryStr = queryDefault
        }

        navigate({pathname:`/items/${category}/${id}`, search:queryStr})

    }

    return {page, size, moveToList, moveToRead}
}

export default useCustomItem