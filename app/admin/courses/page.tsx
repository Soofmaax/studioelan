import Link from 'next/link';

export default function CoursesPage() {
  // Mock courses data
  const courses = [
    {
      id: '1',
      title: 'Yoga Vinyasa',
      description: 'Un style dynamique qui synchronise le mouvement avec la respiration.',
      price: 25,
      duration: 60,
      level: 'ALL_LEVELS',
      capacity: 15,
    },
    {
      id: '2',
      title: 'Yoga Doux',
      description: 'Une pratique douce et accessible, parfaite pour les débutants.',
      price: 22,
      duration: 60,
      level: 'BEGINNER',
      capacity: 12,
    },
    {
      id: '3',
      title: 'Méditation',
      description: 'Séances guidées pour apaiser l'esprit et développer la pleine conscience.',
      price: 18,
      duration: 45,
      level: 'ALL_LEVELS',
      capacity: 20,
    },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Gestion des cours</h1>
          <p className="mt-2 text-sm text-gray-700">
            Liste des cours disponibles au studio
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-sage hover:bg-gold text-white px-4 py-2 rounded-md">
            Ajouter un cours
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {course.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.price}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.capacity} pers.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <Link
                      href={`/admin/courses/${course.id}/edit`}
                      className="text-sage hover:text-gold"
                    >
                      Modifier
                    </Link>
                    <button className="text-red-600 hover:text-red-800">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}