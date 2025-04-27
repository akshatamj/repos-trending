import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=20"
      )
      .then((res) => {
        setRepositories(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load the repositories. Please try again Later!");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-6xl bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-10 text-center text-indigo-800">
          Top 20 Trending GitHub Repositories
        </h1>

        {error ? (
          <div className="text-center text-red-500 font-semibold py-6">
            {error}
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-60">
            <div className="border-4 border-blue-300 border-t-blue-600 rounded-full w-12 h-12 animate-spin">
              Loading...
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-md shadow-md">
              <thead className="bg-blue-100 text-gray-800 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 border-r border-gray-200 text-center">
                    Repository
                  </th>
                  <th className="px-6 py-4 border-r border-gray-200 text-center">
                    Stars
                  </th>
                  <th className="px-6 py-4 border-r border-gray-200 text-center">
                    Language
                  </th>
                  <th className="px-6 py-4 border-r border-gray-200 text-center">
                    GitHub
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {repositories.map((repo) => (
                  <tr key={repo.id} className="hover:bg-blue-50">
                    <td className="px-6 py-4 text-blue-600 font-medium hover:underline">
                      <Link to={`/project/${repo.owner.login}/${repo.name}`}>
                        {repo.full_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{repo.stargazers_count}</td>
                    <td className="px-6 py-4">{repo.language || "N/A"}</td>
                    <td className="px-6 py-4">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
