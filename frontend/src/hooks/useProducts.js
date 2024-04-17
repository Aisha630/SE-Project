import {useEffect, useState} from 'react';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://api.secondtimearound.xyz/products');
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return { products, loading, error };
}