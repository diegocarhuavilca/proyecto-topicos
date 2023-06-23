import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import axios from "axios"

const firebaseConfig = {
  apiKey: "AIzaSyDCQTM57smRvpYY0jqs0Xnqr49h-lUXRQQ",
  authDomain: "topicos-proyecto-389400.firebaseapp.com",
  projectId: "topicos-proyecto-389400",
  storageBucket: "topicos-proyecto-389400.appspot.com",
  messagingSenderId: "824902228587",
  appId: "1:824902228587:web:f868c527f0f2cf2370ef2e",
};

// Initialize Firebase
const firebase = initializeApp(
  firebaseConfig,
  "gs://topicos-proyecto-389400.appspot.com/"
);
const storage = getStorage(firebase);

export async function returnRandomFileDirectory(directoryName) {
  const listaItems = (await listAll(ref(storage, directoryName))).items;
  return listaItems[Math.floor(Math.random() * listaItems.length)].name
}

export async function getUrlByName(fileName,directoryName){
  const imageRef = ref(storage, directoryName + "/" + fileName)
   return await getDownloadURL(imageRef).catch((err)=>{
    throw new Error(err)
   })
}

