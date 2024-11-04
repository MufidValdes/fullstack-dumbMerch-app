import { getProfile, updateProfile } from '@/app/stores/profile/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import ProfileInfo from './component/profile-info';
import { TransactionCard } from './component/transaction-card';
import { useForm } from 'react-hook-form';
import { IUserProfile } from '@/types/users';

const ProfilePage = () => {
  const transactions: any[] = [
    /* array data transaksi */
  ];
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.profile);
  const user = useAppSelector((state) => state.auth.user);
  const { register, handleSubmit, reset } = useForm<IUserProfile>({
    defaultValues: {
      fullname: '',
      phone: '',
      gender: 'MALE',
      address: '',
    },
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      reset(profile);
      setPreviewAvatar(profile.avatar || '/default-avatar.png');
    }
  }, [profile, reset]);

  const onSubmit = async (data: IUserProfile) => {
    const formData = new FormData();
    formData.append('fullname', data.fullname);
    formData.append('address', data.address);
    formData.append('gender', data.gender);
    formData.append('phone', data.phone.toString());

    if (avatarFile) {
      formData.append('avatar', avatarFile); // Tambahkan file avatar jika ada
    }

    await dispatch(updateProfile(formData));
    dispatch(getProfile());
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file)); // Set preview avatar
    }
  };

  return (
    <div className="bg-black text-white min-h-max w-[100%] p-8 items-center m-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <Header />
        {error && (
          <div className="">
            <h1>Error: {error}</h1>
          </div>
        )}

        {/* Profile Section */}
        <div className=" lg:flex w-[100%] justify-between">
          {/* Profile Information */}
          <div className="space-y-4">
            <h2 className="text-2xl text-red-500 font-black">My Profile</h2>
            <div className="sm:flex gap-4 ml-4">
              {/* Profile Details */}
              <Card className="w-auto sm:w-[400px] lg:w-[300px] h-[340px] lg:h-[400px]">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="float-end border-none"
                      variant="outline"
                    >
                      <RiEdit2Fill />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px] bg-white">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex ">
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer"
                        >
                          <img
                            src={previewAvatar || '/default-avatar.png'}
                            alt="avatar"
                            className="w-[200px] h-[300px] object-cover rounded-md"
                          />
                          <input
                            type="file"
                            id="avatar-upload"
                            className="hidden"
                            onChange={handleAvatarChange}
                          />
                        </label>
                        <div className="">
                          <div className="grid gap-4 py-4 ml-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="name"
                                className="text-left"
                              >
                                Name
                              </Label>
                              <Input
                                id="name"
                                placeholder={profile.fullname}
                                className="col-span-3"
                                {...register('fullname')}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="email"
                                className="text-left"
                              >
                                Email
                              </Label>
                              <Input
                                disabled
                                id="email"
                                placeholder={user?.email}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="Phone"
                                className="text-left"
                              >
                                Phone
                              </Label>
                              <Input
                                id="Phone"
                                placeholder={profile.phone}
                                className="col-span-3"
                                {...register('phone')}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="gender"
                                className="text-left"
                              >
                                Gender
                              </Label>
                              <RadioGroup defaultValue="MALE">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="FEMALE"
                                    id="r1"
                                    {...register('gender')}
                                  />
                                  <Label htmlFor="r1">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="MALE"
                                    id="r2"
                                    {...register('gender')}
                                  />
                                  <Label htmlFor="r2">Male</Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="Address"
                                className="text-left"
                              >
                                Address
                              </Label>
                              <Textarea
                                className="col-span-3"
                                placeholder="Type your Address here."
                                id="Address"
                                {...register('address')}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              disabled={loading}
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </div>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <img
                  src={
                    'https://wallpapercave.com/wp/wp13357407.jpg' ||
                    profile.avatar
                  }
                  alt="Profile"
                  className="rounded-lg w-full h-[90%] md:h-[300px] lg:h-[360px] object-cover "
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

          {/* Transaction Section */}
          <div className="space-y-4 relative w-full  h-[420px] overflow-hidden ">
            <div className="sticky top-0 bg-black z-10 sm:mt-12">
              <h2 className="text-2xl text-red-500 font-black">
                My Transaction
              </h2>
            </div>
            {/* Adjust height to account for the header */}
            <div className="flex flex-col overflow-y-auto h-[calc(100%-80px)] w-[395px] space-y-2 ml-4">
              {transactions.map((transaction, index) => (
                <TransactionCard
                  key={index}
                  transaction={transaction}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
