import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2>home</h2>
            <Link to="/auth" className="text-red-700 font-bold hover:text-cyan-400">Ir a Login</Link>    
        </div>
    )
};

export default Home;