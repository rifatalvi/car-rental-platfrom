
export const fetchSingleCars = async (id, token) => {
    try {
        const res = await fetch(`${process.env.SERVER_MAIN_URL}/cars/${id}`, {
           
            headers:{
                authorization: `Bearer ${token}` || ""
            }
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching single car:", error);
        return null;
    }
};
export const feature = async()=>{
    const res = await fetch(`${process.env.SERVER_MAIN_URL}/feature`);
    const data = await res.json()
    return data;
}