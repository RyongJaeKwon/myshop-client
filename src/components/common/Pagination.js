const Pagenation = ({serverData, movePage, keyword}) => {
    return (
        <div className="m-6 flex justify-center">
            {serverData.prev ? <div className="m-2 p-2 w-16 text-center font-bold text-blue-400"
            onClick={() => movePage({page: serverData.prevPage, keyword})}>이전</div> : <></>}

            {serverData.pageList.map(pageNum => <div key={pageNum} className={`m-2 p-2 w-12 text-center rounded shadow-md text-white
            ${serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"}`}
            onClick={() => movePage({page:pageNum, keyword})}>
                {pageNum}
            </div>
            )}
            
            {serverData.next ? <div className="m-2 p-2 w-16 text-center font-bold text-blue-400"
            onClick={() => movePage({page: serverData.nextPage, keyword})}>다음</div> : <></>}
        </div>
    )
}

export default Pagenation