
export default function tagsPage(): React.JSX.Element {
    const tagsList = ['Frontend', 'Backend', 'SEO', 'UI/UX', 'Tailwind', 'DevOps'];
  return (
    <div className="w-5/6  mx-auto my-8 py-4 px-8  text-blue-900 rounded-2xl ">
      <h1 className="text-xl font-bold text-center text-blue-900 mb-6">
        Manage Tags
      </h1>

      <div className="bg-gray-100 p-6 rounded-xl shadow-md">
        <p className="text-lg font-semibold text-center text-blue-900 mb-4">Tags</p>
        <ul className="list-disc list-inside space-y-2">
          {tagsList.map((tag, index) => (
            <li key={index} className="text-blue-900">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}