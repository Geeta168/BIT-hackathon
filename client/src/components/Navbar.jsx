import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ openLogin }) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">

      <Link to="/" className="text-3xl font-bold gradient-text">HealTech</Link>

      <div className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
        <Link className="nav-link" to="/">Home</Link>
        
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/services">Services</Link>
        <Link className="nav-link" to="/privacy">Privacy</Link>
        <Link className="nav-link" to="/helpline">Helpline</Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            try {
              const logged = localStorage.getItem('isLoggedIn') === 'true';
              const role = localStorage.getItem('userRole');
              if (typeof openLogin === 'function') return openLogin();
              if (logged && role) return navigate(role === 'doctor' ? '/doctor' : '/patient');
              // fallback: go home where login modal is available
              navigate('/');
            } catch (e) {
              if (typeof openLogin === 'function') openLogin(); else navigate('/');
            }
          }}
          className="flex flex-col items-center text-blue-700 font-semibold"
          aria-label="Open login"
        >
          <span className="text-2xl">👤</span>
          <span className="text-sm">Login</span>
        </button>
      </div>

    </nav>
  )
}
