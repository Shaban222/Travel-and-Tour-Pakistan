import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      disabled={mutation.isLoading}  // Disable while loading
      className={`rounded flex bg-white items-center text-blue-600 px-4 py-2 font-semibold hover:bg-gradient-to-r from-green-500 to-green-700 hover:text-white ${
        mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {mutation.isLoading ? "Signing Out..." : "Sign Out"}
    </button>
  );
};

export default SignOutButton;
