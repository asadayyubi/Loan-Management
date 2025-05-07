import type { UserDetailsType } from "../services/types";

export const UserDetailsCard = ({
  userDetails,
}: {
  userDetails: UserDetailsType;
}) => {
  console.log("User Details:", userDetails);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Borrower Details
      </h3>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{userDetails.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">PAN</p>
            <p className="font-medium">{userDetails.pan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Aadhar</p>
            <p className="font-medium">{userDetails.aadhar}</p>
          </div>
        </div>

        {userDetails.gstin && (
          <div>
            <p className="text-sm text-gray-500">GSTIN</p>
            <p className="font-medium">{userDetails.gstin}</p>
          </div>
        )}

        {userDetails.udyam && (
          <div>
            <p className="text-sm text-gray-500">UDYAM</p>
            <p className="font-medium">{userDetails.udyam}</p>
          </div>
        )}
      </div>
    </div>
  );
};
