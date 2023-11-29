import { Navigate, useLocation } from "react-router-dom";
import useMember from "../hooks/useMember";
import useAuth from "../hooks/useAuth";

const MemberRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isMember, isMemberLoading] = useMember();
    const location = useLocation();
    

    if (loading || isMemberLoading) {
        return <div className="animate-pulse flex flex-col items-center gap-4 w-60">
        <div>
          <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
          <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
        </div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-full rounded-md"></div>
        <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
      </div>
    }

    if (user && isMember) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default MemberRoute;