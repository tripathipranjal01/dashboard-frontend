import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Briefcase, FileText, LogOut, User } from 'lucide-react';
import { UserContext } from '../state_management/UserContext.tsx';
import Profile from './Profile';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { userDetails, token } = useContext(UserContext);
  const [user, setUser] = useState(userDetails.name);

  useEffect(() => {
    setUser(userDetails.name);
  }, [userDetails]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Job Tracker', icon: Briefcase },
    { id: 'optimizer', label: 'Resume Optimizer', icon: FileText },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    FLASHFIRE
                  </h1>
                  <p className="text-xs text-gray-500">Complete Workflow Optimization</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex space-x-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => onTabChange(id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button
                onClick={() =>
                  user
                    ? (() => {
                        localStorage.clear();
                        setUser('');
                        navigate('/login');
                      })()
                    : (() => {
                        onTabChange('login');
                        navigate('/login');
                      })()
                }
              >
                {user && <LogOut />}
                <p className="font-medium">{user ? 'Logout' : ''}</p>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 z-10"
            >
              ×
            </button>
            <Profile />
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
