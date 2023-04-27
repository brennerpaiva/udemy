import { useState } from "react";
import { db } from "./firebaseConnection";
import {collection, doc, setDoc, addDoc, getDocs, updateDoc, deleteDoc} from "firebase/firestore";

import "./app.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");

  const [posts, setPosts] = useState([]);

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

  async function editarPost() {
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Post Atualizado");
        setIdPost('')
        setTitulo('')
        setAutor('')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function ExcluirPost(id) {
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(() => {
      buscarPost()
      alert("post deletado com sucesso!");
    })
  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase</h1>

      <div className="container">
        <label>Id do post:</label>
        <input
          placeholder="Digite o id do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />

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
                <button onClick={() => ExcluirPost(item.id)}>Excluir</button> <br />
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
