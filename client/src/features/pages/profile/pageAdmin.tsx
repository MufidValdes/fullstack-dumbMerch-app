import { getProfile } from '@/app/stores/profile/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import Navbar from '@/components/layout/navbar';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import ProfileInfo from './component/profile-info';
import Sidebar from '@/components/layout/sidebar';
import { NavIcons } from '../dashboard/page';
const ProfileAdminPage = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.profile);
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        icons={NavIcons}
        avatarSrc={profile.avatar!}
      />
      <main className="flex-1 p-8 overflow-auto">
        <Navbar />
        <div className="bg-black text-white rounded-md p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="space-y-4">
              <h2 className="text-2xl text-red-500 font-black">My Profile</h2>
              <div className="sm:flex gap-4 ml-4">
                {/* Profile Details */}
                <Card className="w-auto sm:w-[400px] lg:w-[300px] h-[380px]">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="rounded-lg w-full h-full object-cover "
                  />
                </Card>
                <div className="space-y-2 text-wrap p-5">
                  <ProfileInfo
                    label="Name"
                    value={profile.fullname}
                  />
                  <ProfileInfo
                    label="Email"
                    value={user?.email!}
                  />
                  <ProfileInfo
                    label="Phone"
                    value={profile.phone}
                  />
                  <ProfileInfo
                    label="Gender"
                    value={profile.gender}
                  />
                  <ProfileInfo
                    label="Address"
                    value={profile.address}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProfileAdminPage;
