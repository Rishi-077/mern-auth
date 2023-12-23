import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form action="" className="flex flex-col gap-4">
          {/*  

        firebase storage rules

          allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
       */}
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center rounded-full cursor-pointer object-cover"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be 2 MB)
              </span>
            ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
              <span className="text-slate-700">{`uploading: ${uploadPercentage} %`}</span>
            ) : uploadPercentage === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="username"
            className="bg-slate-100 rounded-lg  p-3"
          />
          <input
            defaultValue={currentUser.email}
            type="eamil"
            id="eamil"
            placeholder="Email"
            className="bg-slate-100 rounded-lg  p-3"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg  p-3"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity:95  disabled:opacity-80">
            Update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </div>
    </>
  );
}
