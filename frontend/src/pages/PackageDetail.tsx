import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import * as apiClient from "./../api-client";

const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const { data: packageData } = useQuery(
    "fetchPackageById",
    () => apiClient.fetchPackageById(packageId || ""),
    {
      enabled: !!packageId,
    }
  );

  if (!packageData) {
    return <div>Loading...</div>; // Better fallback while data is loading
  }

  const {
    packageName,
    packageDescription,
    facilities,
    pricePerPerson,
    type,
    departureDate,
    arrivalDate,
    locations,
  } = packageData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{packageName}</h1>
        <p className="text-lg font-medium text-gray-600">
          Type: {type} | Price Per Person: PKR {pricePerPerson}
        </p>
        <p className="text-sm text-gray-500">
          Departure: {new Date(departureDate).toLocaleDateString()} | Arrival:{" "}
          {new Date(arrivalDate).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {facilities.map((facility) => (
          <div
            className="border border-slate-300 rounded-sm p-3"
            key={facility}
          >
            {facility}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Locations</h2>
        <ol className="list-decimal pl-5 space-y-2">
          {locations.map((location, index) => (
            <li key={index}>
              <span className="font-bold">{location.name}: </span>
              <span>{location.description}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <div className="whitespace-pre-line">{packageDescription}</div>
        <div className="h-fit space-y-4">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full"
            onClick={() => navigate("/contact-us")}
          >
            Contact Us for Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
