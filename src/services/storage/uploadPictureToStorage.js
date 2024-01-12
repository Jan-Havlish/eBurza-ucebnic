import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const uploadPictureToStorage = async (file, setNotification, setNotificationType) => {
  if (!file) return;

  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setNotification("Nahrávání souboru: " + progress + "%");
        setNotificationType("info");
      },
      (error) => {
        console.log(error);
        setNotification("Chyba při nahrávání souboru, " + error);
        setNotificationType("error");
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            console.log(error);
            setNotification("Chyba při nahrávání souboru, " + error);
            setNotificationType("error");
            reject(error);
          });
      }
    );
  });
};

export default uploadPictureToStorage;
