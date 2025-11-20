import { useAuth0 } from "@auth0/auth0-react";

export function useApi() {
    const { getAccessTokenSilently } = useAuth0();
    const apiBase = process.env.REACT_APP_API_URL || "https://localhost:5001";

    const callApi = async (path, options = {}) => {
        const token = await getAccessTokenSilently({
            authorizationParams: { audience: process.env.REACT_APP_AUTH0_AUDIENCE }
        });
        const headers = {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
        const res = await fetch(`${apiBase}${path}`, { ...options, headers });
        if (!res.ok) throw new Error(`API ${res.status}`);
        return res.json();
    };

    return { callApi };
}