export default function Sot23b1Dashboard() {
    return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Teachers</h2>
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-pink-50 transition">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">2301010034</td>
              <td className="px-6 py-4 text-sm text-gray-700">Satya Sai Ramakrishnan</td>
              <td className="px-6 py-4 text-sm text-gray-600">satyasai@pw.live</td>
              <td className="px-6 py-4 text-sm text-center">
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                  Remove
                </button>
              </td>
              
            </tr>
            <tr className="hover:bg-pink-50 transition">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">2301010034</td>
              <td className="px-6 py-4 text-sm text-gray-700">Syed Zabi Ulla</td>
              <td className="px-6 py-4 text-sm text-gray-600">syedzabi@pw.live</td>
              <td className="px-6 py-4 text-sm text-center">
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                  Remove
                </button>
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

