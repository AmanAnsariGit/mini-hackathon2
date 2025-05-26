import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Body from "../../components/Body";
import { supabase } from "../../config/Supabase";

const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [participants, setParticipants] = useState({});
  const [participantInputs, setParticipantInputs] = useState({});

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Fetch user's events
  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("created_by", user.id);

      if (error) console.error(error);
      else setEvents(data);
    };

    fetchEvents();
  }, [user]);

  const onSubmit = async (formData) => {
    const { title, description, datetime, location, category } = formData;

    const { error } = await supabase.from("events").insert([
      {
        title,
        description,
        datetime,
        location,
        category,
        status: "Pending",
        created_by: user.id,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Error creating event");
    } else {
      reset();
      alert("Event submitted for approval");
      // await fetchEvents(); // call the same fetchEvents function
    }
  };

  const handleAddParticipant = async (eventId) => {
    const name = participantInputs[eventId]?.name;
    const email = participantInputs[eventId]?.email;

    if (!name || !email) return alert("Please fill both fields");

    const { data: existing } = await supabase
      .from("participants")
      .select("*")
      .eq("event_id", eventId)
      .eq("email", email);

    if (existing.length > 0) {
      alert("Participant already exists for this event");
      return;
    }

    const { error } = await supabase.from("participants").insert([
      {
        event_id: eventId,
        name,
        email,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Failed to add participant");
    } else {
      alert("Participant added");
      setParticipantInputs((prev) => ({ ...prev, [eventId]: {} }));
    }
  };

  return (
    <Body>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1>Create New Event</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ marginBottom: "30px" }}
        >
          <div>
            <input
              placeholder="Title"
              {...register("title")}
              className="input"
            />
          </div>
          <div>
            <textarea
              placeholder="Description"
              {...register("description")}
              className="input"
            />
          </div>
          <div>
            <input
              type="datetime-local"
              {...register("datetime")}
              className="input"
            />
          </div>
          <div>
            <input
              placeholder="Location"
              {...register("location")}
              className="input"
            />
          </div>
          <div>
            <select {...register("category")} className="input">
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
          <button type="submit" className="button">
            Create Event
          </button>
        </form>

        <h2>My Events</h2>
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>
              <strong>Status:</strong> {event.status}
            </p>
            <p>
              <strong>Category:</strong> {event.category}
            </p>

            {event.status === "Approved" && (
              <div style={{ marginTop: "10px" }}>
                <h4>Add Participant</h4>
                <input
                  type="text"
                  placeholder="Name"
                  value={participantInputs[event.id]?.name || ""}
                  onChange={(e) =>
                    setParticipantInputs((prev) => ({
                      ...prev,
                      [event.id]: { ...prev[event.id], name: e.target.value },
                    }))
                  }
                  className="input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={participantInputs[event.id]?.email || ""}
                  onChange={(e) =>
                    setParticipantInputs((prev) => ({
                      ...prev,
                      [event.id]: { ...prev[event.id], email: e.target.value },
                    }))
                  }
                  className="input"
                />
                <button
                  className="button"
                  onClick={() => handleAddParticipant(event.id)}
                >
                  Add Participant
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Body>
  );
};

export default Home;
