import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJobs, deleteJob } from "../api/jobsApi";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const pageResponse = await fetchJobs({
        page,
        size: 5,
        status: statusFilter,
      });

      setJobs(pageResponse.content || []);
      setTotalPages(pageResponse.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [page, statusFilter]);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;

    await deleteJob(jobId);
    loadJobs(); // reload current page
  };

  return (
    <div>
      <h2>Jobs</h2>

      <Link to="/jobs/new">➕ Add Job</Link>

      <br /><br />

      {/* FILTER */}
      <label>Status:</label>{" "}
      <select
        value={statusFilter}
        onChange={(e) => {
          setPage(0);
          setStatusFilter(e.target.value);
        }}
      >
        <option value="">ALL</option>
        <option value="APPLIED">APPLIED</option>
        <option value="INTERVIEW">INTERVIEW</option>
        <option value="OFFER">OFFER</option>
        <option value="REJECTED">REJECTED</option>
        <option value="CREATED">CREATED</option>
        <option value="WITHDRAWN">WITHDRAWN</option>
        <option value="ACCEPTED">ACCEPTED</option>
      </select>

      <br /><br />

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> – {job.status}
              <br />
              {job.location}
              <br />
              <Link to={`/jobs/${job.id}/edit`}>Edit</Link>{" "}
              <button onClick={() => handleDelete(job.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <br />

      {/* PAGINATION */}
      <button
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 0}
      >
        Previous
      </button>

      <span> Page {page + 1} of {totalPages} </span>

      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page + 1 >= totalPages}
      >
        Next
      </button>
    </div>
  );
}