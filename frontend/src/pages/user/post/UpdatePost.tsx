import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPostByIdQuery, useEditPostMutation } from "../../../redux/post/postAPI";
import { useUploadPostImageMutation } from "../../../redux/image/imageAPI";
import { UploadCloud, BookOpen, Crop, X, Loader } from "lucide-react";

import DistrictDropdown from "./DistrictDropdown";
import ImageCropper from "./ImageCropper";
import PostErrorBanner from "./PostErrorBanner";

interface UploadImageResponse {
  imageUrl: string;
}

interface UpdatePostPayload {
  other_details: string;
  current_living: string;
  education: string;
  image?: string | null;
}

const extractErrorMessage = (err: unknown): string => {
  if (err && typeof err === "object") {
    const data = (err as any)?.data;
    if (data?.message) return data.message;
    const status = (err as any)?.status;
    if (status === 401) return "Unauthorized";
    if (status === 404) return "Post not found";
    if (status === 403) return "You don't have permission to edit this post";
  }
  return "Failed to update post. Please try again.";
};

const dataUrlToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  const u8 = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) u8[i] = bstr.charCodeAt(i);
  return new File([u8], filename, { type: mime });
};

const UpdatePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch existing post data
  const { data: postData, isLoading: isFetchingPost, error: fetchError } = useGetPostByIdQuery(id || "");

  // Form state
  const [otherDetails, setOtherDetails] = useState("");
  const [currentLiving, setCurrentLiving] = useState("");
  const [education, setEducation] = useState("");
  const [rawSrc, setRawSrc] = useState<string | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Mutations
  const [editPost] = useEditPostMutation();
  const [uploadPostImage] = useUploadPostImageMutation();

  // Populate form when post data is loaded
  useEffect(() => {
    if (postData) {
      setOtherDetails(postData.other_details || "");
      setCurrentLiving(postData.current_living || "");
      setEducation(postData.education || "");
      setCurrentImageUrl(postData.image || null);
    }
  }, [postData]);

  // Track if form has been modified
  useEffect(() => {
    if (!postData) return;
    const changed =
      otherDetails !== (postData.other_details || "") ||
      currentLiving !== (postData.current_living || "") ||
      education !== (postData.education || "") ||
      croppedPreview !== null;
    setHasChanges(changed);
  }, [otherDetails, currentLiving, education, croppedPreview, postData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawSrc(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropDone = (dataUrl: string) => {
    setCroppedPreview(dataUrl);
    setShowCropper(false);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setRawSrc(null);
  };

  const handleRemoveImage = () => {
    setCroppedPreview(null);
    setCurrentImageUrl(null);
    setRawSrc(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccess(false);

    if (!id) {
      setErrorMessage("Post ID is missing");
      return;
    }

    if (!hasChanges) {
      setErrorMessage("No changes to save");
      return;
    }

    setIsSubmitting(true);

    try {
      let postImageUrl: string | null | undefined = undefined;

      // Only upload if image was cropped (changed)
      if (croppedPreview) {
        const file = dataUrlToFile(croppedPreview, "post-image.jpg");
        const formData = new FormData();
        formData.append("image", file);
        const res = await uploadPostImage(formData).unwrap() as UploadImageResponse;
        postImageUrl = res.imageUrl;
      } else if (currentImageUrl === null && postData?.image) {
        // User removed the image
        postImageUrl = null;
      }
      // If no changes to image, don't include it in the payload

      const payload: any = {
        other_details: otherDetails,
        current_living: currentLiving,
        education,
      };

      // Only include image if it was modified
      if (postImageUrl !== undefined) {
        payload.image = postImageUrl;
      }

      await editPost({
        id,
        postData: payload,
      }).unwrap();

      setSuccess(true);
      setCroppedPreview(null);
      setRawSrc(null);

      // Redirect after success
      setTimeout(() => {
        navigate(`/post/${id}`);
      }, 1500);
    } catch (err) {
      setErrorMessage(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  
  if (isFetchingPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader className="animate-spin text-purple-500" size={40} />
          <p className="text-gray-600 font-medium">Loading post...</p>
        </div>
      </div>
    );
  }

  // Error state for fetch
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <PostErrorBanner
            message={extractErrorMessage(fetchError)}
            onDismiss={() => navigate(-1)}
          />
          <button
            onClick={() => navigate(-1)}
            className="mt-4 mx-auto block px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Not found
  if (!postData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The post you're trying to edit doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Cropper modal */}
      {showCropper && rawSrc && (
        <ImageCropper
          src={rawSrc}
          onDone={handleCropDone}
          onCancel={handleCropCancel}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl rounded-2xl p-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Edit Post
            </h1>
            <p className="text-gray-500 text-sm mt-1">Update your post information</p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6">
              <PostErrorBanner
                message={errorMessage}
                onDismiss={() => setErrorMessage(null)}
              />
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl border border-emerald-200 bg-emerald-50">
              <span className="text-emerald-500 text-lg">✓</span>
              <p className="text-sm font-semibold text-emerald-700">Post updated successfully! Redirecting...</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Other Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Details
              </label>
              <textarea
                rows={4}
                placeholder="Write something about yourself..."
                className="w-full border border-gray-200 rounded-xl p-3 outline-none resize-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
              />
            </div>

            {/* Current Living */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Living District
              </label>
              <DistrictDropdown value={currentLiving} onChange={setCurrentLiving} />
            </div>

            {/* Education */}
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-purple-400" size={18} />
              <input
                type="text"
                placeholder="Education"
                className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>

            {/* Image Upload/Edit */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Upload Image
                <span className="ml-2 text-[11px] font-normal text-gray-400">
                  (auto-cropped to 3:4 portrait for the feed)
                </span>
              </label>

              {croppedPreview ? (
                // New cropped image preview
                <div className="flex flex-col items-center gap-3">
                  <div className="p-[3px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg">
                    <div className="overflow-hidden rounded-[14px]" style={{ width: 180, height: 240 }}>
                      <img
                        src={croppedPreview}
                        alt="new cropped preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400">New Preview (3:4 portrait)</p>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                      border border-fuchsia-200 text-fuchsia-600 hover:bg-fuchsia-50 cursor-pointer transition">
                      <Crop size={13} />
                      Change / Re-crop
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    <button
                      type="button"
                      onClick={() => setCroppedPreview(null)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                        border border-rose-200 text-rose-500 hover:bg-rose-50 transition"
                    >
                      <X size={13} />
                      Discard Changes
                    </button>
                  </div>
                </div>
              ) : currentImageUrl ? (
                // Current image display
                <div className="flex flex-col items-center gap-3">
                  <div className="p-[3px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg">
                    <div className="overflow-hidden rounded-[14px]" style={{ width: 180, height: 240 }}>
                      <img
                        src={currentImageUrl}
                        alt="current post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400">Current Image (3:4 portrait)</p>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                      border border-fuchsia-200 text-fuchsia-600 hover:bg-fuchsia-50 cursor-pointer transition">
                      <Crop size={13} />
                      Replace Image
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                        border border-rose-200 text-rose-500 hover:bg-rose-50 transition"
                    >
                      <X size={13} />
                      Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                // No image - upload prompt
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200
                  rounded-xl py-10 cursor-pointer hover:border-pink-400 transition bg-gradient-to-br from-pink-50/50 to-indigo-50/50">
                  <div className="flex flex-col items-center">
                    <div className="p-4 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 mb-2">
                      <UploadCloud size={36} className="text-purple-400" />
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Click to upload image</p>
                    <p className="text-[11px] text-gray-300 mt-0.5">You'll be able to crop before posting</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>

            {/* Info about unsaved changes */}
            {hasChanges && (
              <div className="flex items-center gap-2 p-3 rounded-xl border border-blue-200 bg-blue-50">
                <span className="text-blue-500 text-sm">ℹ</span>
                <p className="text-sm text-blue-700">You have unsaved changes</p>
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !hasChanges}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
