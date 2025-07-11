import React, { useState } from 'react';
import { Edit3, Trash2, Calendar, Building, FileImage, Clock, CheckCircle, XCircle, Users, Award } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onDragStart: (e: React.DragEvent, job: Job) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onDragStart,
  onEdit,
  onDelete,
}) => {
  const [showResumeSection, setShowResumeSection] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [resumeImage, setResumeImage] = useState<string | null>(null);

  const handleImagePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              setResumeImage(event.target?.result as string);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'saved': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'applied': return <FileImage className="w-4 h-4 text-blue-500" />;
      case 'interviewing': return <Users className="w-4 h-4 text-amber-500" />;
      case 'offer': return <Award className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTimelineSteps = () => {
    const allSteps = ['saved', 'applied', 'interviewing', 'offer'];
    const currentIndex = allSteps.indexOf(job.currentStatus);
    
    return allSteps.map((step, index) => ({
      status: step,
      label: step.charAt(0).toUpperCase() + step.slice(1),
      completed: index <= currentIndex,
      current: step === job.currentStatus
    }));
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, job)}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{job.jobTitle}</h4>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Building className="w-3 h-3 mr-1" />
            <span className="truncate">{job.companyName}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center text-xs text-gray-500 mb-3">
        <Calendar className="w-3 h-3 mr-1" />
        <span>{job.createdAt}</span>
      </div>

      {/* Resume Screenshot Section */}
      <div className="mb-3">
        <button
          onClick={() => setShowResumeSection(!showResumeSection)}
          className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
        >
          <FileImage className="w-3 h-3 mr-1" />
          Resume Preview
        </button>
        
        {showResumeSection && (
          <div className="mt-2 border border-gray-200 rounded p-2">
            <div
              className="border-2 border-dashed border-gray-300 rounded p-2 text-center cursor-pointer hover:border-gray-400"
              onPaste={handleImagePaste}
              tabIndex={0}
            >
              {resumeImage ? (
                <div className="max-h-32 overflow-y-auto">
                  <img 
                    src={resumeImage} 
                    alt="Resume Preview" 
                    className="w-full h-auto rounded"
                  />
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  Paste image here (Ctrl+V)
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Timeline Section */}
      <div className="mb-3">
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="text-xs text-purple-600 hover:text-purple-700 flex items-center"
        >
          <Clock className="w-3 h-3 mr-1" />
          Timeline
        </button>
        
        {showTimeline && (
          <div className="mt-2 border border-gray-200 rounded p-2">
            <div className="space-y-2">
              {getTimelineSteps().map((step, index) => (
                <div key={step.status} className="flex items-center text-xs">
                  <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {step.completed && <CheckCircle className="w-2 h-2 text-white" />}
                  </div>
                  <span className={`${step.current ? 'font-semibold text-purple-600' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
            title="Edit Job"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Delete Job"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center">
          {getStatusIcon(job.currentStatus)}
        </div>
      </div>
    </div>
  );
};

export default JobCard;