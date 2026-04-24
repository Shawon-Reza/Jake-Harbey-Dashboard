import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useCurrentUserQuery, usePasswordResetMutation, useProfileUpdateMutation } from '../../Api/authApi';
import SettingsTabs from './SettingsTabs';
import AccountSettingsTab from './AccountSettingsTab';
import SecuritySettingsTab from './SecuritySettingsTab';

const toDisplay = (value) => {
  if (value === null || value === undefined || value === '') return 'N/A';
  return value;
};

const getFullName = (user) => {
  if (user?.full_name) return user.full_name;
  const first = user?.first_name || user?.firstName || '';
  const last = user?.last_name || user?.lastName || '';
  const combined = `${first} ${last}`.trim();
  return combined || 'N/A';
};

const getPhone = (user) => {
  return user?.phone_number || user?.phone || user?.mobile_number || '';
};

const fallbackProfile = 'https://ui-avatars.com/api/?name=NA&background=E5E7EB&color=6B7280';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUserQuery();
  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useProfileUpdateMutation();
  const { mutateAsync: resetPassword, isPending: isResettingPassword } = usePasswordResetMutation();
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);

  const [accountData, setAccountData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profileImage: ''
  });

  const [securityData, setSecurityData] = useState({
    oldPassword: 'password123',
    newPassword: 'password123',
    confirmPassword: '@uyad))11n'
  });

  const passwordRequirements = [
    { text: 'Minimum 8 characters.', met: true },
    { text: 'Use combination of uppercase and lowercase letters.', met: true },
    { text: 'Use of special characters (e.g. !, @, #, $, %).', met: true }
  ];

  const fileInputRef = useRef(null);

  const initialAccountData = useMemo(() => {
    return {
      fullName: getFullName(currentUser),
      email: currentUser?.email || '',
      phone: getPhone(currentUser),
      profileImage: currentUser?.profile_picture || currentUser?.profileImage || fallbackProfile,
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    setAccountData(initialAccountData);
    setSelectedProfileFile(null);
  }, [currentUser, initialAccountData]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedProfileFile(file);
      setAccountData(prev => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const handleAccountChange = (field, value) => {
    setAccountData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };

  const handleAccountCancel = () => {
    setAccountData(initialAccountData);
    setSelectedProfileFile(null);
  };

  const handleProfileUpdate = async () => {
    console.log('User given profile data:', {
      fullName: accountData.fullName,
      phone: accountData.phone,
      profileImage: selectedProfileFile
        ? {
          name: selectedProfileFile.name,
          size: selectedProfileFile.size,
          type: selectedProfileFile.type,
        }
        : null,
    });

    await updateProfile({
      full_name: accountData.fullName,
      phone: accountData.phone,
      profile_picture: selectedProfileFile,
    });
    setSelectedProfileFile(null);
  };

  const handleSecurityCancel = () => {
    setSecurityData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handlePasswordReset = async () => {
    console.log('User given password data:', {
      oldPassword: securityData.oldPassword,
      newPassword: securityData.newPassword,
      confirmPassword: securityData.confirmPassword,
    });

    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    if (!securityData.oldPassword || !securityData.newPassword) {
      toast.error('Please fill all password fields.');
      return;
    }

    try {
      await resetPassword({
        old_password: securityData.oldPassword,
        new_password: securityData.newPassword,
      });

      toast.success('Password updated successfully.');
      handleSecurityCancel();
    } catch (error) {
      console.log('Password reset error:', error?.response?.data || error);
      toast.error(
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        'Failed to update password.'
      );
    }
  };

  return (
    <div className="mx-auto w-full p-4 md:p-5">
      <h1 className="text-2xl font-medium text-[#2A2A2A] mb-5">Settings</h1>

      <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Main Content Container */}
      <div className="max-w-7xl bg-white rounded-xl p-5 md:p-6 border border-[#E0E0E0] shadow-sm">
        {activeTab === 'account' && (
          <AccountSettingsTab
            accountData={accountData}
            isUserLoading={isUserLoading}
            fallbackProfile={fallbackProfile}
            fileInputRef={fileInputRef}
            onImageChange={handleImageChange}
            onAccountChange={handleAccountChange}
            onCancel={handleAccountCancel}
            onUpdate={handleProfileUpdate}
            isUpdating={isUpdatingProfile}
            toDisplay={toDisplay}
          />
        )}

        {activeTab === 'security' && (
          <SecuritySettingsTab
            showOldPassword={showOldPassword}
            showNewPassword={showNewPassword}
            showConfirmPassword={showConfirmPassword}
            securityData={securityData}
            passwordRequirements={passwordRequirements}
            onSecurityChange={handleSecurityChange}
            onToggleOldPassword={() => setShowOldPassword(!showOldPassword)}
            onToggleNewPassword={() => setShowNewPassword(!showNewPassword)}
            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            onUpdatePassword={handlePasswordReset}
            onCancel={handleSecurityCancel}
            isUpdatingPassword={isResettingPassword}
          />
        )}
      </div>
    </div>
  );
}
