import { useEffect, useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
} from "../../../redux/userAuth/userAuthAPI";
import { useUploadProfileImageMutation } from "../../../redux/image/imageAPI";
import { RootState } from "../../../redux/store";
import DateOfBirthPicker from "./DateOfBirthPicker";

interface UploadResponse {
  imageUrl: string;
}

const SL_DISTRICTS = [
  "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo",
  "Galle","Gampaha","Hambantota","Jaffna","Kalutara",
  "Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar",
  "Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya",
  "Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya",
];

/** Calculate age from an ISO date string. Returns null if invalid. */
const calcAge = (dob: string): number | null => {
  if (!dob) return null;
  const birth = new Date(dob + "T00:00:00");
  if (isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const UpdateProfile = () => {
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const { data: user, isLoading } = useGetUserQuery(userId, { skip: !userId });

  const [updateProfile]        = useUpdateProfileMutation();
  const [uploadProfileImage]   = useUploadProfileImageMutation();
  const [updateProfilePicture] = useUpdateProfilePictureMutation();
  
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [gender,setGender] = useState("");
  const [marriageStatus, setMarriageStatus] = useState("");
  const [occupation,setOccupation] = useState("");
  const [income,setIncome] = useState("");
  const [district,setDistrict] = useState("");
  const [height,setHeight] = useState("");
  const [weight,setWeight] = useState("");
  const [dateOfBirth,setDateOfBirth] = useState("");

  const [imageFile,setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  const age = calcAge(dateOfBirth);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setGender(user.gender || "");
      setMarriageStatus(user.marriage_status || "");
      setOccupation(user.occupation || "");
      setIncome(user.income || "");
      setDistrict(user.district || "");
      setHeight(user.height || "");
      setWeight(user.weight || "");
      setImagePreview(user.ProfilePicture || null);
      if (user.dateOfBirth) {
        setDateOfBirth(new Date(user.dateOfBirth).toISOString().split("T")[0]);
      }
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await uploadProfileImage(formData).unwrap() as UploadResponse;
        await updateProfilePicture({ profilePictureUrl: uploadRes.imageUrl }).unwrap();
      }
      await updateProfile({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        gender,
        marriage_status: marriageStatus,
        occupation,
        income: Number(income),
        district,
        height: Number(height),
        weight: Number(weight),
        dateOfBirth: dateOfBirth || undefined,
        age: age ?? undefined,   
      }).unwrap();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const input = "w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition text-sm";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-semibold text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl rounded-2xl p-6 md:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Update Profile
          </h2>
          <p className="text-gray-500 text-sm mt-1">Edit your personal information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="p-[3px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  {imagePreview
                    ? <img src={imagePreview} alt="avatar" className="w-full h-full object-cover" />
                    : <span className="text-gray-400 text-xs">No Image</span>}
                </div>
              </div>
              <label className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full cursor-pointer hover:bg-pink-600 transition shadow-md">
                📷
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          {/* First + Last Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className={input} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className={input} />
            </div>
          </div>

          {/* Date of Birth + Age (auto) */}
          <div className="grid md:grid-cols-2 gap-4 items-end">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
                <span className="ml-2 text-[10px] font-normal text-gray-400">(must be 18+)</span>
              </label>
              <DateOfBirthPicker value={dateOfBirth} onChange={setDateOfBirth} />
            </div>

            {/* Age — read-only, auto-filled from DOB */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
                <span className="ml-2 text-[10px] font-normal text-gray-400">(auto-calculated)</span>
              </label>
              <div
                className={`w-full border rounded-xl p-3 text-sm flex items-center justify-between transition
                  ${age !== null
                    ? "border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50"
                    : "border-gray-200 bg-gray-50"
                  }`}
              >
                {age !== null ? (
                  <span className="font-semibold text-gray-700">{age} years old</span>
                ) : (
                  <span className="text-gray-300">Select date of birth</span>
                )}
                {age !== null && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shrink-0">
                    {age} yrs
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-4">
              {["Male", "Female"].map(g => (
                <button key={g} type="button" onClick={() => setGender(g)}
                  className={`p-3 rounded-xl border font-medium text-sm transition
                    ${gender === g ? "border-pink-400 bg-pink-50 text-pink-600" : "border-gray-200 hover:border-pink-300"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Marriage Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Marriage Status</label>
            <select value={marriageStatus} onChange={e => setMarriageStatus(e.target.value)} className={input}>
              <option value="">Select Status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
            <input type="text" placeholder="Occupation" value={occupation} onChange={e => setOccupation(e.target.value)} className={input} />
          </div>

          {/* Income + District */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
              <input type="number" placeholder="Monthly Income" value={income} onChange={e => setIncome(e.target.value)} className={input} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select value={district} onChange={e => setDistrict(e.target.value)} className={input}>
                <option value="">Select District</option>
                {SL_DISTRICTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Height + Weight */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input type="number" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} className={input} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} className={input} />
            </div>
          </div>

          {/* Submit */}
          <button type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition shadow-lg">
            Update Profile
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
