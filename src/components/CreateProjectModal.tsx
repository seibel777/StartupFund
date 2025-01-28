import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface CreateProjectModalProps {
  show: boolean;
  onClose: () => void;
  onProjectCreated: () => void;
}

function CreateProjectModal({ show, onClose, onProjectCreated }: CreateProjectModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    category: '',
    image_url: '',
    end_date: ''
  });

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Please sign in to create a project');

      const { error } = await supabase.from('projects').insert([
        {
          ...formData,
          goal: parseFloat(formData.goal),
          user_id: user.id,
        }
      ]);

      if (error) throw error;

      toast.success('Project created successfully!');
      onProjectCreated();
      onClose();
      setFormData({
        title: '',
        description: '',
        goal: '',
        category: '',
        image_url: '',
        end_date: ''
      });
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg max-w-lg w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Create New Project</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Funding Goal ($)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    required
                    min="1"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    disabled={loading}
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Green Tech">Green Tech</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Image URL</label>
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                    disabled={loading}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Campaign End Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                    disabled={loading}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;