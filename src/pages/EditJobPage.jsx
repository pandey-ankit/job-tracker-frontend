import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJobById, updateJob } from "../api/jobsApi";

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    status: "CREATED",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const job = await fetchJobById(id);
        setForm({
          title: job.title,
          description: job.description,
          location: job.location,
          status: job.status,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updateJob(id, form);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to update job");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading job...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Edit Job</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label><br />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label><br />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status</label><br />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="APPLIED">APPLIED</option>
            <option value="INTERVIEWING">INTERVIEWING</option>
            <option value="OFFERED">OFFERED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="CREATED">CREATED</option>
            <option value="WITHDRAWN">WITHDRAWN</option>
            <option value="ACCEPTED">ACCEPTED</option>
          </select>
        </div>

        <br />

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}