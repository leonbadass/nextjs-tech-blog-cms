'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface DeleteCategoriesProps {
  categoryId: string;
}

export default function DeleteCategories({ categoryId}: DeleteCategoriesProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
    const Router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: categoryId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete category");
      }

      // Refresh the list after successful deletion
      alert(`Category deleted successfully!`);
      Router.refresh();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-sm text-red-600 hover:underline"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 text-sm ">{error}</p>}
    </div>
  );
}