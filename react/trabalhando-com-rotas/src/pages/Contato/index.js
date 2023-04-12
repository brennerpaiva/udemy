import { Link } from 'react-router-dom';

function Contato() {
    return (
      <div>
        <h1>Contato da Empresa</h1>
        <p>Contato (xx)21312-32131</p> 

        <Link to={"/"}>Home</Link> <br/>
        <Link to={"/sobre"}>Sobre</Link>
      </div>
    );
}

export default Contato