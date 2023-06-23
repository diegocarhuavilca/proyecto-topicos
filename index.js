// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import express from 'express';
import axios from "axios"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {getStorage,ref,getDownloadURL,listAll  } from "firebase/storage"
import {returnRandomFileDirectory,getUrlByName} from './services.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCQTM57smRvpYY0jqs0Xnqr49h-lUXRQQ",
  authDomain: "topicos-proyecto-389400.firebaseapp.com",
  projectId: "topicos-proyecto-389400",
  storageBucket: "topicos-proyecto-389400.appspot.com",
  messagingSenderId: "824902228587",
  appId: "1:824902228587:web:f868c527f0f2cf2370ef2e"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig,"gs://topicos-proyecto-389400.appspot.com/");
const storage = getStorage(firebase);
const imageRef = ref(storage,"020837f4-dcf1-49cf-a4fd-1c751c0ae716 (1).png")


const app = express();

app.get("/",async (req,res)=>{
 res.send('home')
})

app.get('/cats',async (req, res) => {
  const directory = "cats"
  const nameFile = await returnRandomFileDirectory(directory)
  const data = await getUrlByName(nameFile,directory)
  const imageResponse = await axios.get(data,{responseType : "stream"})
  res.setHeader("Content-Type", imageResponse.headers["content-type"])
  res.setHeader("Content-Length",imageResponse.headers["content-length"])
  imageResponse.data.pipe(res)
});

app.get('/cheems',async (req, res) => {
  const directory = "cheems"
  const nameFile = await returnRandomFileDirectory(directory)
  const data = await getUrlByName(nameFile,directory)
  const imageResponse = await axios.get(data,{responseType : "stream"})
  res.setHeader("Content-Type", imageResponse.headers["content-type"])
  res.setHeader("Content-Length",imageResponse.headers["content-length"])
  imageResponse.data.pipe(res)
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});