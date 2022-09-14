import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/context.js";

import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
import {
  doc,
  onSnapshot,
  collection,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { MdEdit } from "react-icons/md";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  const submitHandler = (e, file) => {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `/files/${file.name}/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            }).catch((err) => console.log(err));
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
              photoURL: downloadURL,
            });
            setPhotoUrl(downloadURL);
          }
        );
      } else {
        alert("Only images are allowed");
      }
    }
  };

  return (
    <div className="profile">
      <h5>User Profile</h5>
      <div className="profile-user">
        <div className="profile-user-avatar">
          {photoUrl ? (
            <img src={photoUrl} alt="user-img" />
          ) : (
            <div className="user-img-dummy">
              <span>{user.displayName[0]}</span>
            </div>
          )}
          <div className="file-input">
            <input
              type="file"
              name="file-input"
              id="file-input"
              className="file-input__input"
              onChange={(e) => submitHandler(e, e.target.files[0])}
            />
            <label className="file-input__label" htmlFor="file-input">
              <span>
                <MdEdit />
              </span>
            </label>
          </div>
        </div>
        <div className="profile-user-info">
          <h5>{user.displayName}</h5>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
