import { useState } from 'react'
import { db } from './firebaseConnection'
import {doc, setDoc } from 'firebase/firestore'

import './app.css'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');


  async function handleAdd() {
    await setDoc(doc(db, "posts", "12345"), {
        titulo: titulo,
        autor: autor,
    })
    .then(() => {
      console.log("Dados Registrados no Banco")
    })
    .catch((error) => {
      console.log("Gerou erro!" + error)
    })
  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase</h1>

      <div className="container">
        <label>Titulo</label>
        <textarea
          type="text"
          placeholder="Digite o titulo"
          value={titulo} onChange={(e) => setTitulo(e.target.value)}
        ></textarea>

        <label>Autor</label>
        <textarea
          type="text"
          placeholder="Digite o autor"
          value={autor} onChange={(e) => setAutor(e.target.value)}
        ></textarea>

        <button onClick={handleAdd}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;
