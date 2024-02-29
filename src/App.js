import { useState, useEffect } from "react";
import { db, auth} from './firebaseConnection';

import {
  doc, 
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  snapshotEqual
} from 'firebase/firestore';

import{
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

function App(){
  const [titulo, setTitulo] = useState("")
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  
  const [posts, setPosts] = useState([])
  
  const [user, setUser] = useState(false)
  const [userDetail, setUserDetail] = useState([])
  
  useEffect{() =>{
    async function carregarPosts(){
      const dados = onSnapshot(collection(db, 'posts'), (snapshot) => {
        let listaPost = []
        snapshot.forEach((doc) => {
          listaPost.push({
            idPost: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
            
          });
        });

      })
    }
  }
  }

}

export default App