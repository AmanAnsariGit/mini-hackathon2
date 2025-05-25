// pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import DashboardLayout from '../layouts/DashboardLayout';

export default function AdminDashboard() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const { data: pending } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'pending');

    const { data: all } = await supabase.from('events').select('*');

    const { data: users } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'customer');

    setPendingEvents(pending || []);
    setAllEvents(all || []);
    setCustomers(users || []);
  };

  const handleApprove = async (eventId, status) => {
    await supabase
      .from('events')
      .update({ status })
      .eq('id', eventId);
    fetchDashboardData();
  };

  return (
    <DashboardLayout role="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Pending Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingEvents.map(event => (
              <div key={event.id} className="p-4 border rounded shadow">
                <h3 className="font-bold">{event.title}</h3>
                <p>{event.description}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleApprove(event.id, 'approved')}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApprove(event.id, 'rejected')}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <Link to="/uploadform">
          <button className="text-xl font-semibold mb-2">All Events</button>
          </Link>
          <ul>
            {allEvents.map(e => (
              <li key={e.id}>
                {e.title} - {e.status}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Customers</h2>
          <ul>
            {customers.map(c => (
              <li key={c.id}>
                {c.email} –
                <a
                  href={`/admin/view-customer/${c.id}`}
                  className="text-blue-500 underline ml-2"
                >
                  View Details
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardLayout>
  );
}
