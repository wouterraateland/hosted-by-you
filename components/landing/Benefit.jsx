export default function Benefit({ emoji, label }) {
  return (
    <div className="flex items-start space-x-4">
      <span aria-label="" role="img">
        {emoji}
      </span>
      <p className="text-gray-900">{label}</p>
    </div>
  );
}
