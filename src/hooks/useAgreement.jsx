import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";

const useAgreement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { refetch, data: agreement = [] } = useQuery({
    queryKey: ['agreement', user?.email], 
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/agreements?email=${user.email}`);
        console.log(res.data);
        return res.data;
      } else {
        
        return [];
      }
    },
  });

  return [agreement, refetch];
};

export default useAgreement;
