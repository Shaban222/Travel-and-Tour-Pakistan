import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMyPackages } from "../api-client"; // Assuming this is the location of your fetch helper
import { PackageType } from "../../../backend/src/shared/types";

const MyPackages = () => {
  const [packages, setPackages] = useState<PackageType[]>([]);
  console.log("Packages",packages)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await fetchMyPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setError("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const deletePackage = async (id: string) => {
    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      } else {
        alert("Failed to delete package.");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Packages</h1>
        <Link
          to="/add-package"
          className="rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 font-bold"
        >
          Add Package
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading packages...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : packages?.length > 0 ? (
        packages?.map((pkg) => (
          <div
            key={pkg._id}
            className="border rounded-lg p-4 shadow-md space-y-2 bg-white"
          >
            <h3 className="text-xl font-semibold">{pkg.packageName}</h3>
            <p>
              <strong>Price:</strong> {pkg.pricePerPerson} per person
            </p>
            <p>
              <strong>Vehicle:</strong> {pkg.vehicle}
            </p>
            <p>
              <strong>Duration:</strong> {pkg.days} days
            </p>
            <p>
              <strong>Locations:</strong> {pkg.locations.length > 0 && pkg.locations.map((location) => 
                <div className="mt-2">
                  <p className="font-semibold">{location.name}</p>
                  <p>{location.description}</p>
                </div>
              )}
            </p>
            <div className="flex justify-between">
              <Link
                to={`/edit-package/${pkg._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Edit
              </Link>
              <button
                onClick={() => deletePackage(pkg._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No packages found.</p>
      )}
    </div>
  );
};

export default MyPackages;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// // Define the package type
// type Package = {
//   _id: string; // or `number` if IDs are numeric
//   name: string;
//   pricePerPerson: number;
// };

// const MyPackages = () => {
//   const [packages, setPackages] = useState<Package[]>([]); // Add a type for the packages state

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await fetch("/api/my-packages");
//         const data: Package[] = await response.json(); // Add type assertion
//         setPackages(data);
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   const deletePackage = async (id: string) => { // Explicitly type `id` as string
//     try {
//       const response = await fetch(`/api/packages/${id}`, { method: "DELETE" });
//       if (response.ok) {
//         setPackages(packages.filter((pkg) => pkg._id !== id));
//       } else {
//         alert("Failed to delete package.");
//       }
//     } catch (error) {
//       console.error("Error deleting package:", error);
//     }
//   };

//   return (
//     <div className="space-y-4 p-4">
//       <h2 className="text-xl font-bold">My Packages</h2>
//       {packages.map((pkg) => (
//         <div key={pkg._id} className="package-card">
//           <h3>{pkg.name}</h3>
//           <p>Price: {pkg.pricePerPerson}</p>
//           <Link to={`/edit-package/${pkg._id}`} className="btn-secondary">Edit</Link>
//           <button onClick={() => deletePackage(pkg._id)} className="btn-danger">Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyPackages;
