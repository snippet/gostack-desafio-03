import React, {useState, useEffect} from "react";
import Api from 'services/api';
import "./styles.css";

function App() {
  let [repositories, setRepositories] = useState([]);

  useEffect(() => {
      Api.get('repositories').then(response => {
        setRepositories(response.data);
      });
  },[]);

  async function handleAddRepository() {
    let newRepository = await Api.post('repositories',{
      "title" : `Novo Repositório ${Date.now()}`,
      "url": "http://github.com/...",
      "techs": [
        "Node.js",
        "React"
      ]
    });

    setRepositories([...repositories, newRepository.data]);
  }

  async function handleRemoveRepository(id) {
    await Api.delete(`repositories/${id}`);

    let newRepositories = repositories.filter(rep => rep.id !== id);
    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
