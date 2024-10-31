function ProfileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-red-500 text-lg font-extrabold">{label}</div>
      <div className="text-white text-lg w-64">{value}</div>
    </div>
  );
}

export default ProfileInfo;
