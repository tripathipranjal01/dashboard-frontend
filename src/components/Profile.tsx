import React, { useState, useEffect } from 'react';
import { User, Edit3, Save, X, Lock } from 'lucide-react';

interface ProfileData {
  clientName: string;
  plan: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    clientName: 'John Doe',
    plan: 'Premium Plan'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [tempData, setTempData] = useState<ProfileData>(profileData);

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('user-profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData(parsed);
      setTempData(parsed);
    }
  }, []);

  const handleEditClick = () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = () => {
    if (password === '12345') {
      setIsEditing(true);
      setShowPasswordPrompt(false);
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const handleSave = () => {
    setProfileData(tempData);
    localStorage.setItem('user-profile', JSON.stringify(tempData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
    setShowPasswordPrompt(false);
    setPassword('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
            <p className="text-sm text-gray-600">Client Information</p>
          </div>
        </div>
        
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Enter Password
              </h4>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to edit"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={handlePasswordSubmit}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Submit
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={tempData.clientName}
              onChange={(e) => setTempData({ ...tempData, clientName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 font-medium">{profileData.clientName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plan
          </label>
          {isEditing ? (
            <select
              value={tempData.plan}
              onChange={(e) => setTempData({ ...tempData, plan: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Basic Plan">Basic Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              <option value="Enterprise Plan">Enterprise Plan</option>
            </select>
          ) : (
            <p className="text-gray-900 font-medium">{profileData.plan}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;