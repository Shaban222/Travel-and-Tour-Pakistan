import React from "react";

// Define the type for a package
type Package = {
  name: string;
  type: string;
  pricePerPerson: number;
  departureDate: string; // Backend might send these as strings
  arrivalDate: string;
};

// Define the props for the PackageCard component
type PackageCardProps = {
  pkg: Package;
};

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  return (
    <div className="package-card">
      <h3>{pkg.name}</h3>
      <p>Type: {pkg.type}</p>
      <p>Price: {pkg.pricePerPerson}</p>
      <p>Departure: {new Date(pkg.departureDate).toDateString()}</p>
      <p>Arrival: {new Date(pkg.arrivalDate).toDateString()}</p>
    </div>
  );
};

export default PackageCard;
