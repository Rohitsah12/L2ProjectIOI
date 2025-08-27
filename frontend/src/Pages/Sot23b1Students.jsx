export default function Sot23b1Students() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">SOT23B1 Students</h2>
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Profile</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-pink-50 transition">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">2301010034</td>
              <td className="px-6 py-4 text-sm text-gray-700">Deepali</td>
              <td className="px-6 py-4 text-sm text-gray-600">deepali@sot.com</td>
              <td className="px-6 py-4 text-sm text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                  View
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-center">
                <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                  Edit
                </button>
              </td>
            </tr>
            <tr className="hover:bg-pink-50 transition">
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">2301010034</td>
              <td className="px-6 py-4 text-sm text-gray-700">Deepali</td>
              <td className="px-6 py-4 text-sm text-gray-600">deepali@sot.com</td>
              <td className="px-6 py-4 text-sm text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                  View
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-center">
                <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
