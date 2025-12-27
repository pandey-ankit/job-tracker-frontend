import axiosClient from "./axiosClient";

export const fetchJobs = async ({
  page = 0,
  size = 10,
  sort = "createdAt,desc",
  status = "",
}) => {
  const params = {
    page,
    size,
    sort,
  };

  if (status) {
    params.status = status;
  }

  const response = await axiosClient.get("/jobs", { params });
  return response.data;
};


export const createJob = async (jobData) => {
  const response = await axiosClient.post("/jobs", jobData);
  return response.data;
};

export const deleteJob = async (jobId) => {
  await axiosClient.delete(`/jobs/${jobId}`);
};


export const updateJob = async (jobId, jobData) => {
  await axiosClient.put(`/jobs/${jobId}`, jobData);
};


export const fetchJobById = async (jobId) => {
  const response = await axiosClient.get(`/jobs/${jobId}`);
  return response.data;
};

