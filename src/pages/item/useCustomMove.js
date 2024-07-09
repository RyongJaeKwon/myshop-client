import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) => {
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}

const useCustomMove = () => {
    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 12)
    const queryDefault = createSearchParams({page, size}).toString()

    const moveToList = (param) => {
        let queryStr = ""

        if(param){
            const pageNum = getNum(param.page, 1)
            const sizeNum = getNum(param.size, 12)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()
        }else {
            queryStr = queryDefault
        }

        navigate({pathname:`../list`, search:queryStr})
    }
}