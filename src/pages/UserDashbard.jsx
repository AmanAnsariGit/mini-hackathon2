// pages/CustomerDashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import DashboardLayout from "../DashboardLayout";

export default function CustomerDashboard() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (user) {
      setUser(user.user);
      const { data: events } = await supabase
        .from("events")
        .select("*")
        .eq("created_by", user.user.id);
      setEvents(events || []);
    }
  };

  return (
    <DashboardLayout role="customer">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 border rounded shadow">
              <h3 className="font-bold">{event.title}</h3>
              <p>{event.description}</p>
              <span className="text-sm italic text-gray-500">
                Status: {event.status}
              </span>

              <div className="mt-2 flex gap-2">
                {event.status === "pending" && (
                  <a
                    href={`/edit-event/${event.id}`}
                    className="text-blue-500 underline"
                  >
                    Edit
                  </a>
                )}
                {event.status === "approved" && (
                  <a
                    href={`/event/${event.id}/participants`}
                    className="text-green-600 underline"
                  >
                    View/Add Participants
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="/create-event"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Create New Event
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
