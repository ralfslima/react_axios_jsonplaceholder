import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');

  useEffect(() => {
    // Buscar posts do JSONPlaceholder
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar posts:', error);
      });
  }, []);

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleCorpoChange = (event) => {
    setCorpo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!titulo || !corpo) {
      alert('Por favor, preencha o título e o corpo.');
      return;
    }

    // Enviar dados para o JSONPlaceholder (simulando uma requisição POST)
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      userId: 1, // Exemplo de userId
      title: titulo,
      body: corpo,
    })
    .then(response => {
      // Atualizar posts com o novo post
      setPosts([response.data, ...posts]);
      // Limpar os campos do formulário
      setTitulo('');
      setCorpo('');
      alert('Dados cadastrados com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao cadastrar dados:', error);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciador de Posts</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={handleTituloChange}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="corpo">Corpo:</label>
          <textarea
            id="corpo"
            value={corpo}
            onChange={handleCorpoChange}
            style={{ marginLeft: '10px', width: '300px', height: '100px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Cadastrar</button>
      </form>

      <h2>Lista de Posts</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Corpo</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
