import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const { owner, repo } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => setRepoData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load the details. Please try again!");
      });
  }, [owner, repo]);

  if (!repoData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 animate-pulse">
          Loading project details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 font-bold text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 hover:underline text-sm font-medium"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold mb-2">{repoData.full_name}</h2>
        <p className="text-gray-700 mb-4">
          {repoData.description || "No description available."}
        </p>

        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          <span>⭐ Stars: {repoData.stargazers_count}</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3"> About</h2>
            <ul className="space-y-2 text-black-100">
              <li>
                <strong>Owner: </strong>
                {repoData.owner.login}
              </li>
              <li>
                <strong>Created At: </strong>
                {new Date(repoData.created_at).toLocaleDateString()}
              </li>
              <li>
                <strong>Last Updated: </strong>
                {new Date(repoData.updated_at).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Topics Covered</h2>
          {repoData.topics && repoData.topics.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {repoData.topics.map((topic) => (
                <span
                  key={topic}
                  className="bg-blue-100 text-blue-800 px-3 py-1 "
                >
                  {topic}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No Topics Available</p>
          )}
        </div>

        <a
          href={repoData.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          🔗 View on GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;
