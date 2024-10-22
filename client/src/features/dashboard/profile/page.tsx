import { Card } from '@/components/ui/card';
import ProfileInfo from './component/profile-info';
import { Header } from '@/components/layout/header';
import { TransactionCard } from './component/transaction-card';

const ProfilePage = () => {
  const profileDetails = {
    name: 'Yosep',
    email: 'yosepgans@gmail.com',
    phone: '083896833122',
    gender: 'Male',
    address:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  };

  const transaction = {
    item: 'wallpapers',
    date: 'Saturday, 14 Juli 2021',
    price: 'Rp.500.000',
    subTotal: '500.000',
    image: 'https://wallpapercave.com/uwp/uwp4532001.jpeg',
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <Header />

      {/* Profile Section */}
      <div className="flex w-[100%] justify-between">
        {/* Profile Information */}
        <div className="space-y-4">
          <h2 className="text-2xl text-red-500 font-black">My Profile</h2>
          <div className="flex gap-10 ml-4">
            {/* Profile Details */}
            <Card className="w-[338px] h-[420px]">
              <img
                src="https://wallpapercave.com/wp/wp13357407.jpg"
                alt="Profile"
                className="rounded-lg w-[338px] h-full object-cover "
              />
            </Card>
            <div className="space-y-2 text-balance">
              <ProfileInfo
                label="Name"
                value={profileDetails.name}
              />
              <ProfileInfo
                label="Email"
                value={profileDetails.email}
              />
              <ProfileInfo
                label="Phone"
                value={profileDetails.phone}
              />
              <ProfileInfo
                label="Gender"
                value={profileDetails.gender}
              />
              <ProfileInfo
                label="Address"
                value={profileDetails.address}
              />
            </div>
          </div>
        </div>

        {/* Transaction Section */}
        <div className="space-y-4 sm:hidden lg:block w-[65%]">
          <h2 className="text-2xl text-red-500 font-black">My Transaction</h2>
          <TransactionCard transaction={transaction} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
