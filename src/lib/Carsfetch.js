
export const fetchSingleCars = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/cars/${id}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching single car:", error);
        return null;
    }
};