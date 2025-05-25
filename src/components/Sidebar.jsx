import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  const links =
    role === 'admin'
      ? [
          { name: 'Dashboard', to: '/admin' },
          { name: 'All Events', to: '/admin/events' },
          { name: 'Customers', to: '/admin/customers' },
        ]
      : [
          { name: 'My Events', to: '/dashboard' },
          { name: 'Create Event', to: '/create-event' },
        ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 shadow h-full flex flex-col justify-between">
      <nav className="flex flex-col space-y-2">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="hover:bg-gray-200 px-3 py-2 rounded"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-4 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
}
