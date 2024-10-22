function ProfileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-red-500 text-lg font-extrabold">{label}</div>
      <div className="text-white text-lg">{value}</div>
    </div>
  );
}

export default ProfileInfo;
