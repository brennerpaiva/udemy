import { useEffect, useState } from "react";
import { db, auth } from "./firebaseConnection";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth"

import "./app.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const [user, setUser] = useState(false)
  const [userDetail, setUserDetail] = useState({})

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(listaPost);
      });
    }

    loadPosts();
  }, []);

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          //Se tem user logado ele entra aqui
          console.log(user)
          setUser(true)
          setUserDetail({
            uid: user.uid,
            email: user.email,
          })
        } else {
          //Não possui nenhum user logado
          setUser(false)
          setUserDetail({})
        }
      })
    }

    checkLogin()
  }, [])

  async function handleAdd() {
    // Gerando id específico -->
    // await setDoc(doc(db, "posts", "12345"), {
    //     titulo: titulo,
    //     autor: autor,
    // })
    // .then(() => {
    //   console.log("Dados Registrados no Banco")
    // })
    // .catch((error) => {
    //   console.log("Gerou erro!" + error)
    // })

    // Gerando id Aleatório -->
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Dados registrados com sucesso");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("Gerou erro!" + error);
      });
  }

  //Buscar Posts
  async function buscarPost() {
    //   const postRef = doc(db, "posts", "g5kqYmfEb3fSyq5FgACt");
    //   await getDoc(postRef)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor)
    //     setTitulo(snapshot.data().titulo)
    //   })
    //   .catch((error) => {
    //     console.log("Gerou error!" +  error)
    //   })
    const postsRef = collection(db, "posts");
    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
        console.log(posts);
      })
      .catch((error) => {
        console.log("Gerou erro!" + error);
      });
  }

  // Editar Post
  async function editarPost() {
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Post Atualizado");
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Exlcuir Post
  async function ExcluirPost(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef).then(() => {
      alert("post deletado com sucesso!");
    });
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        console.log("Usuario cadastrado");
        console.log(value);
        setSenha("");
        setEmail("");
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Senha muito fraca");
        } else if (error.code === "auth/email-already-in-use") {
          alert("email já existe");
        }
      });
  }

  // Logar Usuário
  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log('User logado com sucesso!');
      console.log(value.user)

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true)

      setEmail("")
      setSenha("")
    })
    .catch((error) =>{
      console.log(error + "Erro ao fazer login!")
    })

  }

  async function fazerLogout() {
    await signOut(auth);
    setUser(false);
    setUserDetail({});
  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase</h1>

      {user && (
        <div>
          <strong>Seja bem vindo, você está logado</strong>
          <strong>
            seu id: {userDetail.uid} seu email: {userDetail.email}
          </strong>
          <button onClick={fazerLogout}>Fazer logout</button>
        </div>
      )}

      <div className="container">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />

        <label>Senha</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />
        <br />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Fazer Login</button>
      </div>

      <div className="container">
        <h2>Posts:</h2>
        <label>ID do post:</label>
        <input
          placeholder="Digite o id do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />{" "}
        <br />
        <label>Titulo</label>
        <textarea
          type="text"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        ></textarea>
        <label>Autor</label>
        <textarea
          type="text"
          placeholder="Digite o autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        ></textarea>
        <button onClick={handleAdd}>Cadastrar</button>
        <br />
        <button onClick={buscarPost}>Buscar Post!</button>
        <br />
        <button onClick={editarPost}>Atualizar Post</button>
        <ul>
          {posts.map((item) => {
            return (
              <li key={item.id}>
                <strong>ID: {item.id}</strong>
                <br />
                <span>Titulo: {item.titulo}</span> <br />
                <span>Autor: {item.autor}</span> <br />
                <button onClick={() => ExcluirPost(item.id)}>
                  Excluir
                </button>{" "}
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
