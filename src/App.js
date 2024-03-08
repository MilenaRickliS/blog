/*import { useState, useEffect } from "react";
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
  onSnapshot
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
  const [userDetail, setUserDetail] = useState({})
  
  useEffect(() =>{
    async function carregarPosts(){
      const dados = onSnapshot(collection(db, 'posts'), (snapshot) => { //snapshot percorre os dados no banco
        let listaPost = []
        snapshot.forEach((doc) => {
          listaPost.push({
            idPost: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
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
            uid: user.uid,
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
      autor: autor,
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
      autor: autor,
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
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
    .then(() => {
      alert('post deletado')
    })
  }
  // Função para criar um novo usuário no Firebase Auth.
  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      console.log("CADASTRADO COM SUCESSO!");
      setEmail('');
      setSenha('');
    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        alert("Senha muito fraca.");
      }else if(error.code === 'auth/email-already-in-use'){
        alert("Email já existe!");
      }
    })
    }
  // Função para fazer login de um usuário no Firebase Auth.
  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("USER LOGADO COM SUCESSO");
      console.log(value.user);
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
    })
      setUser(true);
      
      setEmail('');
      setSenha('');
    })
    .catch(() => {
      console.log("ERRO AO FAZER O LOGIN");
    })
  }
  // Função para fazer logout de um usuário no Firebase Auth.
  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserDetail({});
  }

  return(
    <div>
      <h1>React JS + Firebase</h1>
      { user && (
        <div>
          <strong>Seja bem-vindo(a) (Você está logado!)</strong> <br/>
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span> <br/>
          <button onClick={fazerLogout}>Sair da conta</button>
          <br/> <br/>
        </div>
        )}
        // Seção para cadastro e login de usuários.
        <div className="container">
          <h2>Usuarios</h2>
          <label>Email</label>
          <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite um email"
          /> <br/>
          <label>Senha</label>
          <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Informe sua senha"
          /> <br/>
          <button onClick={novoUsuario}>Cadastrar</button>

          <button onClick={logarUsuario}>Fazer login</button>
        </div>
        <br/><br/>
        <hr/>
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
        <button onClick={editarPost}>Editar</button>
        
        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong>
                <strong>Titulo: {post.titulo}</strong>
                <span>Autor: {post.autor}</span>
                <button onClick={() => excluirPost(post.id)}>Excluir</button>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
  

}

export default App;*/

import './App.css';

// Importa os hooks useState e useEffect do React, que são essenciais para o funcionamento do componente.
import { useState, useEffect } from 'react';
// Importa as funções de conexão com o Firebase e as operações de banco de dados do Firestore.
import { db, auth } from './firebaseConnection';
// Importa funções específicas do Firestore para manipulação de documentos e coleções.
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
// Importa funções de autenticação do Firebase para criar usuários, fazer login e logout.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
// Função principal do componente React, que será renderizada na página.
function App() {
  // Estado para armazenar o título do post.
  const [titulo, setTitulo] = useState('');
  // Estado para armazenar o autor do post.
  const [autor, setAutor] = useState('');
  // Estado para armazenar o ID do post a ser editado ou excluído.
  const [idPost, setIdPost] = useState('');
  // Estado para armazenar o email e a senha do usuário.
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Estado para verificar se o usuário está logado.
  const [user, setUser] = useState(false);
  // Estado para armazenar os detalhes do usuário logado.
  const [userDetail, setUserDetail] = useState({});
  // Estado para armazenar a lista de posts.

  const [posts, setPosts] = useState([]);
  // Efeito que carrega os posts do Firestore sempre que o componente é montado.
  useEffect(() => {
    async function loadPosts(){
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
    let listaPost = [];
    snapshot.forEach((doc) => {
      listaPost.push({
        id: doc.id,
        titulo: doc.data().titulo,
        autor: doc.data().autor,
    })
    })
    setPosts(listaPost);
    })
    }
    loadPosts();
  }, [])
  // Efeito que verifica se o usuário está logado quando o componente é montado.
  useEffect(() => {
    async function checkLogin(){
    onAuthStateChanged(auth, (user) => {
    if(user){
      console.log(user);
      setUser(true);
      setUserDetail({
      uid: user.uid,
      email: user.email
    })
    }else{
      setUser(false);
      setUserDetail({})
    }
    })
    }
    checkLogin();
  }, [])
  // Função para adicionar um novo post ao Firestore.

  async function handleAdd(){
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setAutor('');
      setTitulo('');
    })
    .catch((error) => {
      console.log("ERRO " + error);
    })
  }
  // Função para buscar todos os posts do Firestore.
  async function buscarPost(){
    const postsRef = collection(db, "posts");
    await getDocs(postsRef)
    .then((snapshot) => {
    let lista = [];
    snapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        titulo: doc.data().titulo,
        autor: doc.data().autor,
    })
    })
    setPosts(lista);
    })
    .catch((error) => {
      console.log("DEU ALGUM ERRO AO BUSCAR");
    })
  }
  // Função para editar um post existente no Firestore.
  async function editarPost(){
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("POST ATUALIZADO!");

      setIdPost('');
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      console.log(error);
    })
  }
  // Função para excluir um post do Firestore.
  async function excluirPost(id){
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef)
  .then(() =>{
    alert("POST DELETADO COM SUCESSO!");
  })
  }
  // Função para criar um novo usuário no Firebase Auth.
  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      console.log("CADASTRADO COM SUCESSO!");
      setEmail('');
      setSenha('');
    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
      alert("Senha muito fraca.");
    }else if(error.code === 'auth/email-already-in-use'){
      alert("Email já existe!");
    }
  })
  }
  // Função para fazer login de um usuário no Firebase Auth.
  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("USER LOGADO COM SUCESSO");
      console.log(value.user);
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
    })
      setUser(true);

      setEmail('');
      setSenha('');
    })
    .catch(() => {
      console.log("ERRO AO FAZER O LOGIN");
    })
  }
  // Função para fazer logout de um usuário no Firebase Auth.
  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserDetail({});
  }
// Renderização do componente React.
return (
  <div className='container'>
    <h1>ReactJS + Firebase :)</h1>
    { user && (
      <div className='login'>
        <strong>Seja bem-vindo(a) (Você está logado!)</strong> <br/>
        <span>ID: {userDetail.uid} - Email: {userDetail.email}</span> <br/>
        <button onClick={fazerLogout}>Sair da conta</button>
        <br/> <br/>
      </div>
    )}
    
    <div className="container">
      <h2>Usuarios</h2>
      <label>Email</label>
      <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Digite um email"
      /> <br/>
      <label>Senha</label>
      <input
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      placeholder="Informe sua senha"
      /> <br/>
      <div className='dolado'>
        <button onClick={novoUsuario}>Cadastrar</button>

        <button onClick={logarUsuario}>Fazer login</button>
      </div>
      </div>
      <br/><br/>
      
      <hr/>
      
      <div className="container">
      <h2>POSTS</h2>
      <label>ID do Post:</label>
      <input
      placeholder='Digite o ID do post'
      value={idPost}
      onChange={ (e) => setIdPost(e.target.value) }
      /> <br/>
      <label>Titulo:</label>
      <textarea
      type="text"
      placeholder='Digite o titulo'
      value={titulo}
      onChange={ (e) => setTitulo(e.target.value) }
      />
      <label>Autor:</label>
      <input
      type="text"
      placeholder="Autor do post"
      value={autor}
      onChange={(e) => setAutor(e.target.value) }
      />
      <div className='dolado'>
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar post</button>
        <button onClick={editarPost}>Atualizar post</button>
      </div>

      <ul>
        {posts.map( (post) => {
          return(
          <li key={post.id} className='login'>
            <strong>ID: {post.id}</strong> <br/>
            <span>Titulo: {post.titulo} </span> <br/>
            <span>Autor: {post.autor}</span> <br/>
            <button onClick={ () => excluirPost(post.id) }>Excluir</button> <br/> <br/>
          </li>

          )
        })}
      </ul>
    </div>
  </div>
);
}
export default App;