import { useState } from "react";
import { createJob } from "../api/jobsApi";
import { useNavigate } from "react-router-dom";

export default function AddJobPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    status: "CREATED",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!form.title || form.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!form.description || form.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    }

    if (!form.location) {
      newErrors.location = "Location is required";
    }

    if (!form.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      await createJob(form);
      navigate("/");
    } catch (err) {
      console.error(err);
      setServerError("Failed to create job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add Job</h2>

      {serverError && <p style={{ color: "red" }}>{serverError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Title</label><br />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>

        <div>
          <label>Description</label><br />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}
        </div>

        <div>
          <label>Location</label><br />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          {errors.location && (
            <p style={{ color: "red" }}>{errors.location}</p>
          )}
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
          {errors.status && (
            <p style={{ color: "red" }}>{errors.status}</p>
          )}
        </div>

        <br />

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Create Job"}
        </button>
      </form>
    </div>
  );
}
