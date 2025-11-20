import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
    const { isLoading, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                navigate("/Managefeed");
            } else {
                console.log("User is not authenticated");
            }
        }
    }, [isLoading, isAuthenticated, navigate]);

    return <div>Loading...</div>;
};

export default Callback;
