import { useEffect, useState } from "react";


const useCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://serenity-heaven-server.vercel.app/coupons')
            .then(res => res.json())
            .then(data => {
                setCoupons(data);
                setLoading(false);
            });
    }, [])
    return [coupons, loading]
};

export default useCoupon;