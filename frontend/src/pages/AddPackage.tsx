import { useMutation } from "react-query";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import React from "react";
// import ImagesSection from "../forms/ManageHotelForm/ImagesSection";

type FormData = {
  packageName: string;
  vehicle: string;
  numLocations: number;
  locations: { name: string; description: string }[];
  days: number;
  packageDescription: string;
  pricePerPerson: number;
  type: string;
  facilities: string[];
  departureDate: Date | null;
  arrivalDate: Date | null;
  imageUrls: string[];
  imageFiles: FileList;
};

const AddPackage = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      packageName: "",
      vehicle: "",
      numLocations: 1,
      locations: [{ name: "Starting Point", description: "" }],
      days: 1,
      packageDescription: "",
      pricePerPerson: 0,
      type: "",
      facilities: [],
      departureDate: null,
      arrivalDate: null,
      imageUrls: [],
    },
  });

  const { register, control, handleSubmit, watch, setValue } = methods;
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiClient.addPackage, {
    onSuccess: () => {
      showToast({ message: "Package added successfully!", type: "SUCCESS" });
      navigate("/my-packages");
    },
    onError: () => {
      showToast({ message: "Error adding package", type: "ERROR" });
    },
  });

  const numLocations = watch("numLocations") || 1;

  // Dynamically update the locations array based on numLocations
  React.useEffect(() => {
    const updatedLocations = Array.from({ length: numLocations }, (_, index) => ({
      name:
        index === 0
          ? "Starting Point"
          : index === numLocations - 1
          ? "Ending Point"
          : `Location ${index}`,
      description: "",
    }));
    setValue("locations", updatedLocations);
  }, [numLocations, setValue]);

  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      departureDate: data.departureDate?.toISOString() || "",
      arrivalDate: data.arrivalDate?.toISOString() || "",
    };

    console.log("Formatted Data", formattedData);
    mutate(formattedData);
  };

  // Type and Facilities Options
  const types = [
    "Honeymoon",
    "Mountain View",
    "Adventure",
    "Beach",
    "Family",
    "Historical",
    "Luxury",
    "Safari",
    "Wildlife",
    "Budget",
  ];
  const facilities = [
    "Free Dinner",
    "Accommodation Included",
    "Wi-Fi",
    "Guided Tours",
    "Free Breakfast",
    "Pick & Drop",
    "Swimming Pool",
    "Pet Friendly",
    "All Meals Included",
    "Fitness Center",
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-2xl font-bold">Add New Package</h2>

        <label className="block font-bold">
          Package Name
          <input
            {...register("packageName", { required: true })}
            placeholder="Enter the package name"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block font-bold">
          Vehicle
          <select
            {...register("vehicle", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a vehicle</option>
            <option value="12-seater HiAce">12-seater Hiace</option>
            <option value="15-seater HiAce">15-seater Hiace</option>
            <option value="29-seater Coaster">29-seater Coaster</option>
          </select>
        </label>

        <label className="block font-bold">
          Number of Locations
          <input
            {...register("numLocations", { required: true })}
            type="number"
            placeholder="Enter the number of locations"
            className="w-full p-2 border rounded"
            min={1}
          />
        </label>

        {watch("locations")?.map((location, index) => (
          <div key={index} className="space-y-2">
            <label className="block font-bold">
              {location.name}
              <input
                {...register(`locations.${index}.name` as const, { required: true })}
                className="w-full p-2 border rounded"
                disabled={index === 0 || index === numLocations - 1}
              />
            </label>
            <label className="block font-bold">
              Description
              <textarea
                {...register(`locations.${index}.description` as const, { required: true })}
                placeholder={`Enter description for ${location.name}`}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
        ))}

        <label className="block font-bold">
          Number of Days
          <input
            {...register("days", { required: true })}
            type="number"
            placeholder="Enter the number of days"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block font-bold">
          Package Description
          <textarea
            {...register("packageDescription", { required: true })}
            placeholder="Enter the package description"
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block font-bold">
          Price Per Person
          <input
            {...register("pricePerPerson", { required: true })}
            type="number"
            placeholder="Enter the price per person"
            className="w-full p-2 border rounded"
          />
        </label>

        <fieldset className="space-y-2">
          <legend className="font-bold">Type</legend>
          <div className="grid grid-cols-2 gap-2">
            {types.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register("type", { required: true })}
                  value={type}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="font-bold">Facilities</legend>
          <div className="grid grid-cols-2 gap-2">
            {facilities.map((facility) => (
              <label key={facility} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("facilities")}
                  value={facility}
                  className="mr-2"
                />
                {facility}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex space-x-4">
          <label className="block font-bold pr-2">
            Departure Date:
            <Controller
              name="departureDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="Select departure date"
                  className="w-full p-2 border rounded"
                />
              )}
            />
          </label>
          <label className="block font-bold">
            Arrival Date:
            <Controller
              name="arrivalDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="Select arrival date"
                  className="w-full p-2 border rounded mr-10"
                />
              )}
            />
          </label>
        </div>

        {/* <ImagesSection /> */}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Adding Package..." : "Add Package"}
        </button>
      </form>
    </FormProvider>
  );
};

export default AddPackage;







// import { useMutation } from "react-query";
// import { useForm, Controller } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useAppContext } from "../contexts/AppContext";
// import * as apiClient from "../api-client";


// type FormData = {
//   packageName: string;
//   vehicle: string;
//   numLocations: number;
//   locations: string[];
//   days: number;
//   packageDescription: string;
//   pricePerPerson: number;
//   type: string;
//   facilities: string[];
//   departureDate: Date | null;
//   arrivalDate: Date | null;
// };

// const AddPackage = () => {
//   const { register, control, handleSubmit, watch } = useForm<FormData>({
//     defaultValues: {
//       packageName: "",
//       vehicle: "",
//       numLocations: 1,
//       locations: [""],
//       days: 1,
//       packageDescription: "",
//       pricePerPerson: 0,
//       type: "",
//       facilities: [],
//       departureDate: null,
//       arrivalDate: null,
//     },
//   });

//   const { showToast } = useAppContext();
//   const navigate = useNavigate();
  
//   const { mutate, isLoading } = useMutation(apiClient.addPackage, {
//     onSuccess: () => {
//       showToast({ message: "Package added successfully!", type: "SUCCESS" });
//       navigate("/my-packages"); // Redirect to the packages list
//     },
//     onError: () => {
//       showToast({ message: "Error adding package", type: "ERROR" });
//     },
//   });

//   const numLocations = watch("numLocations") || 1;

//   // Type and Facilities Options (randomly generated)
//   const types = [
//     "Honeymoon", "Mountain View", "Adventure", "Beach", "Family",
//     "Historical", "Luxury", "Safari", "Wildlife", "Budget",
//   ];
//   const facilities = [
//     "Free Dinner", "Accommodation Included", "Wi-Fi", "Guided Tours", 
//     "Free Breakfast", "Pick & Drop", "Swimming Pool", 
//     "Pet Friendly", "All Meals Included", "Fitness Center",
//   ];

//   const onSubmit = (data: FormData) => {
//     const formattedData = {
//       ...data,
//       // packageName: data.name,
//       // packageDescription: data.description,
//       departureDate: data.departureDate?.toISOString() || "",
//       arrivalDate: data.arrivalDate?.toISOString() || "",
//     };
//     console.log("formatted Data", formattedData)
//     mutate(formattedData); // Pass the formatted data to mutate
//   };



  

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
//       <h2 className="text-2xl font-bold">Add New Package</h2>

//       <input
//         {...register("packageName", { required: true })}
//         placeholder="Package Name"
//         className="w-full p-2 border rounded"
//       />

//       <select
//         {...register("vehicle", { required: true })}
//         className="w-full p-2 border rounded"
//       >
//         <option value="12-seater HiAce">12-seater Hiace</option>
//         <option value="15-seater HiAce">15-seater Hiace</option>
//         <option value="29-seater Coaster">29-seater Coaster</option>
//       </select>

//       <input
//         {...register("numLocations", { required: true })}
//         type="number"
//         placeholder="Number of Locations"
//         className="w-full p-2 border rounded"
//       />

//       {[...Array(numLocations)].map((_, index) => (
//         <input
//           key={index}
//           {...register(`locations.${index}`)}
//           placeholder={`Location ${index + 1}`}
//           className="w-full p-2 border rounded"
//         />
//       ))}

//       <input
//         {...register("days", { required: true })}
//         type="number"
//         placeholder="Number of Days"
//         className="w-full p-2 border rounded"
//       />

//       <textarea
//         {...register("packageDescription", { required: true })}
//         placeholder="Description"
//         className="w-full p-2 border rounded"
//       />

//       <input
//         {...register("pricePerPerson", { required: true })}
//         type="number"
//         placeholder="Price Per Person"
//         className="w-full p-2 border rounded"
//       />

//       <div className="space-y-2">
//         <p className="font-bold">Type</p>
//         <div className="grid grid-cols-2 gap-2">
//           {types.map((type) => (
//             <label key={type} className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 {...register("type", { required: true })}
//                 value={type}
//                 className="mr-2"
//               />
//               {type}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-2">
//         <p className="font-bold">Facilities</p>
//         <div className="grid grid-cols-2 gap-2">
//           {facilities.map((facility) => (
//             <label key={facility} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 {...register("facilities")}
//                 value={facility}
//                 className="mr-2"
//               />
//               {facility}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="flex space-x-4">
//         <Controller
//           name="departureDate"
//           control={control}
//           render={({ field }) => (
//             <DatePicker
//               selected={field.value}
//               onChange={(date) => field.onChange(date)}
//               placeholderText="Departure Date"
//               className="w-full p-2 border rounded"
//             />
//           )}
//         />
//         <Controller
//           name="arrivalDate"
//           control={control}
//           render={({ field }) => (
//             <DatePicker
//               selected={field.value}
//               onChange={(date) => field.onChange(date)}
//               placeholderText="Arrival Date"
//               className="w-full p-2 border rounded"
//             />
//           )}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {isLoading ? "Adding Package..." : "Add Package"}
//       </button>
//     </form>
//   );
// };

// export default AddPackage;
