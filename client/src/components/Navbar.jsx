export default function Navbar({ openLogin }) {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white shadow">

      <h1 className="text-3xl font-bold gradient-text">HealTech</h1>

      <div className="hidden md:flex gap-10 text-gray-700 font-medium">
        <a className="nav-link" href="#">About</a>
        <a className="nav-link" href="#">Services</a>
        <a className="nav-link" href="#">Privacy</a>
        <a className="nav-link" href="#">Helpline</a>
      </div>

      <button
        onClick={openLogin}
        className="flex flex-col items-center text-blue-700 font-semibold"
      >
        <span className="text-2xl">👤</span>
        <span>Login</span>
      </button>
    </nav>
  );
}
