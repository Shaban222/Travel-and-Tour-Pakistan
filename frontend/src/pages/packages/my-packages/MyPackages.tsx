import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../../../api-client";
import { 
    // BsBuilding, 
    BsMap } from "react-icons/bs";
import { 
    // BiPackage, 
    BiMoney, 
    // BiStar
 } from "react-icons/bi";

const MyPackages = () => {
  const { data: packageData } = useQuery(
    "fetchMyPackages",
    apiClient.fetchMyPackages,
    {
      onError: () => {},
    }
  );

  if (!packageData) {
    return <span>No packages found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My packages</h1>
        <Link
          to="/add-package"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Package
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {packageData.map((travelPackage) => (
          <div
            data-testid="package-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            key={travelPackage._id} // Adding a key here if it's a list
          >
            <h2 className="text-2xl font-bold">{travelPackage.packageName}</h2>
            <div className="whitespace-pre-line">
              {travelPackage.packageDescription}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {travelPackage.locations.map((location, index) => (
                <div
                  key={index}
                  className="border border-slate-300 rounded-sm p-3 flex items-center"
                >
                  <BsMap className="mr-1" />
                  {location.name}
                </div>
              ))}
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />PKR {travelPackage.totalCost}
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-package/${travelPackage._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPackages;
