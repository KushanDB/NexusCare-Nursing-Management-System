const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-[#015D67]/10 text-[#015D67]',
    green: 'bg-[#00ACB1]/10 text-[#00ACB1]',
    yellow: 'bg-[#CAF0C1]/50 text-[#015D67]',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-[#87E4DB]/20 text-[#015D67]',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-4 rounded-full ${colorClasses[color]}`}>
          <Icon className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;