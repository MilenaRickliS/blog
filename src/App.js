import { useState, useEffect } from "react";
import { db, auth} from './firebaseConnection';
import './App.css'

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

  //editar post (update)
  async function editarPost(id){
    const docRef = doc(db, 'posts', idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    }).then(() => {
      console.log("post atualizado")
      setIdPost('')
      setTitulo('')
      setAutor('')
    }).catch((error) => {
      console.log(error)
    })
  }

  //excluir post (delete)
  async function excluirPost(id){
    const docRef = doc(db, 'posts', idPost)
    await deleteDoc(docRef)
    .then(() => {
      alert('post deletado')
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  return(
    <div>
      <h1>React JS + Firebase</h1>
      <div className="container">
        <h2>POSTS</h2>
        <label>ID do Post:</label>
        <input placeholder="Digite o ID"
        value={idPost}
        onChange={(e) => setIdPost(e.target.value)}/>

        <label>Titulo</label>
        <textarea type='text' placeholder="Digite o Titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}/>

        <label>Autor</label>
        <input type="text" placeholder="Digite o Autor do Post"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}/>

        <button onClick={criarPost}>Cadastrar</button>
        <button onClick={buscarPosts}>Buscar</button>
        <button onClick={editarPost(idPost)}>Editar</button>
        
        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong>
                <strong>Titulo: {post.titulo}</strong>
                <span>Autor: {post.autor}</span>
                <button onClick={excluirPost(post.id)}>Excluir</button>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
  

}

export default App;