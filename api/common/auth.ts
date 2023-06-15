import { HttpRequest } from "@azure/functions";
import * as msal from "@azure/msal-node";
import fetch from "node-fetch";

const config: msal.Configuration = {
    auth: {
        clientId: "d51541d6-75f7-4ef9-ad66-22f6e684e580",
        authority: "https://login.microsoftonline.com/9824557c-e035-41e7-8a4a-2c44626c8b58",
        clientSecret: "<your-client-secret>",
    },
};

const authClient = new msal.ConfidentialClientApplication(config);

const getToken = (authorizationHeader: string | undefined): string | null => {
    if (!authorizationHeader) {
        return null;
    }
    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return null;
    }
    return parts[1];
};

export const authenticate = async (req: HttpRequest) => {
    const token = getToken(req.headers.authorization);
    if (!token) {
        return undefined;
    }
    try {
        const result = await authClient.acquireTokenOnBehalfOf({
            oboAssertion: token,
            scopes: ["https://graph.microsoft.com/.default"],
        });
        return (result.account);
        // const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        //     headers: {
        //         Authorization: `Bearer ${result.accessToken}`,
        //     },
        // });
        // const user = await response.json();
    } catch (err) {
        return undefined;
    }
};
