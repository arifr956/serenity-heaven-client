import { useState } from "react";
import { useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useAnnouncement = () => {
    const [announcement, setannouncement] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    
    useEffect(() => {
        axiosPublic.get('/announcements')
          .then((res) => {
            setannouncement(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching announcement:", error);
            setLoading(false);
          });
      }, []);
      return [announcement, loading];
};

export default useAnnouncement;