import { Link } from "react-router-dom";
import { PackageType } from "../../../backend/src/shared/types";

type Props = {
  packageData: PackageType;
};

const LatestPackagesCard = ({ packageData }: Props) => {
  return (
    <Link
      to={`/packages/detail/${packageData._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
         // src={packageData.imageUrls?.[0] || "/default-package.jpg"} // Fallback image if none available
          alt={packageData.packageName}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-2xl">
          {packageData.packageName}
        </span>
        <div className="text-gray-300 text-sm mt-1">
          {packageData.locations.map((location) => location.name).join(", ")}
        </div>
      </div>
    </Link>
  );
};

export default LatestPackagesCard;
