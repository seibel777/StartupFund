import React, { useState } from 'react';
import { Clock, DollarSign, ExternalLink } from 'lucide-react';
import DonateModal from './DonateModal';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    goal: number;
    raised: number;
    image_url: string;
    end_date: string;
    category: string;
    user_id: string;
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const progress = (project.raised / project.goal) * 100;
  const daysLeft = Math.max(0, Math.ceil((new Date(project.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
            {project.category}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">{project.title}</h3>
          <p className="mt-2 text-gray-600 line-clamp-2">{project.description}</p>
          
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {progress.toFixed(0)}% Funded
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    ${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${Math.min(100, progress)}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{daysLeft} days left</span>
            </div>
            <div className="flex space-x-2">
              <a
                href={`/project/${project.id}`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Details
              </a>
              <button
                onClick={() => setShowDonateModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <DollarSign className="h-4 w-4 mr-1" />
                Back Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <DonateModal
        show={showDonateModal}
        onClose={() => setShowDonateModal(false)}
        project={project}
      />
    </>
  );
}

export default ProjectCard;