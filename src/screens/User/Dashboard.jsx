import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/Supabase';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Pending');

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
      console.error('Error fetching events:', error.message);
    } else {
      setEvents(data);
      setFilteredEvents(data.filter((e) => e.status === 'Pending'));
    }
  };

  const updateStatus = async (eventId, status) => {
    const { error } = await supabase
      .from('events')
      .update({ status })
      .eq('id', eventId);

    if (error) {
      alert(`Failed to ${status} event`);
      console.error(error);
    } else {
      alert(`Event ${status} successfully`);
      fetchAllEvents(); // Refresh
    }
  };

  const filterEvents = (status) => {
    setActiveFilter(status);
    setFilteredEvents(events.filter((e) => e.status === status));
  };

  const countByStatus = (status) => events.filter((e) => e.status === status).length;
  const upcomingCount = events.filter((e) => new Date(e.datetime) > new Date()).length;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Welcome Admin</h2>
        <p className="dashboard-subtitle">
          Here’s a quick overview of your event management system.
        </p>

        <div className="dashboard-stats">
          <div className="stat-box" onClick={() => filterEvents('Upcoming')}>
            <h3>{upcomingCount}</h3>
            <p>Upcoming Events</p>
          </div>
          <div className="stat-box" onClick={() => setFilteredEvents(events)}>
            <h3>{events.length}</h3>
            <p>Total Events</p>
          </div>
          <div className="stat-box" onClick={() => filterEvents('Pending')}>
            <h3>{countByStatus('Pending')}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '10px' }}>{activeFilter} Events</h3>
          {filteredEvents.length === 0 ? (
            <p style={{ color: '#ccc' }}>No events to display</p>
          ) : (
            <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #444' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Title</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '8px' }}>{event.title}</td>
                    <td>{event.description}</td>
                    <td>{event.location}</td>
                    <td>{new Date(event.datetime).toLocaleString()}</td>
                    <td>{event.category}</td>
                    <td>{event.status}</td>
                    <td>
                      {event.status === 'Pending' && (
                        <>
                          <button
                            className="button green"
                            onClick={() => updateStatus(event.id, 'Approved')}
                          >
                            Approve
                          </button>
                          <button
                            className="button red"
                            onClick={() => updateStatus(event.id, 'Rejected')}
                            style={{ marginLeft: '10px' }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
