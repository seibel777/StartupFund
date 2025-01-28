import React from 'react';
import { DollarSign, Users, TrendingUp, BarChart2, Activity, Briefcase, PieChart, ArrowUp } from 'lucide-react';

interface AdminDashboardProps {
  show: boolean;
  onClose: () => void;
}

function AdminDashboard({ show, onClose }: AdminDashboardProps) {
  if (!show) return null;

  const stats = {
    totalRevenue: 77000,
    platformFees: 770,
    activeProjects: 25,
    totalUsers: 1250,
    successRate: 68,
  };

  const recentProjects = [
    { id: 1, name: 'EcoTech Solutions', raised: 32000, goal: 50000, status: 'active' },
    { id: 2, name: 'HealthAI', raised: 45000, goal: 75000, status: 'active' },
    { id: 3, name: 'EduTech Platform', raised: 25000, goal: 30000, status: 'completed' },
  ];

  const categories = [
    { name: 'Technology', count: 12, percentage: 48 },
    { name: 'Healthcare', count: 5, percentage: 20 },
    { name: 'Green Tech', count: 4, percentage: 16 },
    { name: 'Education', count: 4, percentage: 16 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Back to Platform
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">12% from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Platform Fees (1%)</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.platformFees.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">8% from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">5 new this week</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">2% from last month</span>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Project</th>
                      <th className="text-left py-3 px-4">Raised</th>
                      <th className="text-left py-3 px-4">Goal</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map((project) => (
                      <tr key={project.id} className="border-b">
                        <td className="py-3 px-4">{project.name}</td>
                        <td className="py-3 px-4">${project.raised.toLocaleString()}</td>
                        <td className="py-3 px-4">${project.goal.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${(project.raised / project.goal) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h2>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-600">{category.count} projects</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Metrics</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Total Users</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{stats.totalUsers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Monthly Growth</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">+15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <BarChart2 className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Avg. Funding Time</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">28 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;