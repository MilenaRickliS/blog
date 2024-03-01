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
  
  useEffect(() =>{
    async function carregarPosts(){
      const dados = onSnapshot(collection(db, 'posts'), (snapshot) => { //snapshot percorre os dados no banco
        let listaPost = []
        snapshot.forEach((doc) => {
          listaPost.push({
            idPost: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          });
        });
        setPosts(listaPost);
      })
    }
    carregarPosts();
  },[])

  useEffect(() =>{
    async function verificarLogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          //usuário logado
          setUser(true);
          setUserDetail({
            id: user.id,
            email: user.email
          });
        } else{
          setUser(false);
          setUserDetail({});
        }
      })
    }
    verificarLogin();
  },[]);

  //adicionar o post (create)
  async function criarPost(){
    await addDoc(collection(db, "posts"),{
      titulo: titulo,
      autor: autor
    }).then(() =>{
      setAutor('')
      setTitulo('')
    }).catch((error) =>{
      console.log("ERRO" + error)
    })
  }

  //buscar os posts(read)
  async function buscarPosts(){
    const ListasPosts = collection(db, 'posts')
    await getDocs(ListasPosts).then((snapshot) => {
      let lista = [];
      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        });
      });
      setPosts(lista);
    }).catch((error) =>{
      console.log('DEU RUIM' + error)
    });
  }

  

}

export default App