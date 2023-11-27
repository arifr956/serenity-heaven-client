import { useEffect, useState } from "react";


const useApartment = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/apartments')
            .then(res => res.json())
            .then(data => {
                setApartments(data);
                setLoading(false);
            });
    }, [])
    return [apartments, loading]
};

export default useApartment;