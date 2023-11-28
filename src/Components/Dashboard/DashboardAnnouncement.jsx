import useAnnouncement from "../../hooks/useAnnouncement";


const DashboardAnnouncement = () => {
    const [announcement] = useAnnouncement();
    console.log(announcement)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                announcement?.map((a) => (
                    
                        <div  key={a._id} className="relative group duration-500 cursor-pointer group overflow-hidden relative text-gray-50 h-72  rounded-2xl hover:duration-700 duration-700">
                            <div className=" h-72 bg-red-400 text-gray-800">
                                <div className="flex flex-row justify-between">
                                    <svg className="fill-current stroke-current w-8 h-8 p-2 hover:bg-lime-200  rounded-full m-1" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                                        <path className="" d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                                        </path>
                                    </svg>
                                    <svg className="fill-current stroke-current w-8 h-8 p-2 m-1 hover:bg-lime-200 rounded-full" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                                        <path className="svg-stroke-primary" d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute bg-gray-50 -bottom-24  p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                                <span className="text-red-400 font-bold text-xs uppercase">{a.title}</span>
                                {/* <span className="text-gray-800 font-bold text-3xl">Details</span> */}
                                <p className="text-neutral-800 overflow-hidden text-ellipsis group-hover:block">
                                    {a.description}
                                </p>
                            </div>


                        </div>
                   
                ))
            }

        </div>
    );
};

export default DashboardAnnouncement;