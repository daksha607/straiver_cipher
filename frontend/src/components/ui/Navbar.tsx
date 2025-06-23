import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="flex gap-6 text-lg">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chat">Chat</Link>
      </div>
    </nav>
  );
}

export default Navbar;
