const ResultModal = ({content, callbackFn}) => {
    return (
        <div className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center bg-black bg-opacity-20`}>
            <div className="absolute bg-gray-100 w-1/4 rounded-md mt-5 px-5 min-w-[450px]">
                <div className="flex border-blue-400 border-b-4 text-2xl mt-7 mb-5 pt-5 pb-3">{content}</div>
                <div className="justify-end flex">
                    <button className="bg-blue-500 mt-4 mb-4 px-3 pt-3 pb-3 rounded-md text-white"
                    onClick={callbackFn}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ResultModal;