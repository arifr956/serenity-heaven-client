
const SingleApartment = ({ apartment, handleAgreement }) => {
  const { _id, image, blockName, floorNo, apartmentNo, rent } = apartment;


  return (
    <div>
      
      <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
        <div className="h-48 bg-gray-700 rounded-xl"><img className="w-full h-full" src={image} alt="Apartment Thumbnail" /></div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Block: {blockName}</span>
              <p className="text-xs text-gray-700">Floor No: {floorNo}</p>
              <p className="text-xs text-gray-700">Apartment No: {apartmentNo}</p>
            </div>
            <span className="font-bold  text-red-600">${rent}</span>
          </div>
          <button onClick={() => handleAgreement(_id, apartment)} className="hover:bg-sky-700 text-white bg-red-400 py-2 rounded-md"> Confirm Agreement</button>
        </div>
      </div>
    </div>
  );
};

export default SingleApartment;