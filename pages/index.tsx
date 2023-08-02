import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const handleCreateOfficeClick = () => {
        router.push('/office');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <button
                onClick={handleCreateOfficeClick}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Create Office
            </button>
        </div>
    );
}
