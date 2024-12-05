import { useMemo } from "react"
import { Cookies } from "react-cookie";
import { decryptString, encryptString } from "../libs/cryptography";

export const useCookies = () => {
    const cookie = new Cookies();

    const setCookie = async (cookieName: string, cookieValue: object, options: object | undefined = {}) => {
        const encryptedCookieValue = await encryptString(JSON.stringify(cookieValue));
        cookie.set(cookieName, encryptedCookieValue, { ...options });
    };

    const getCookie = async (cookieName: string, key: string): Promise<string> => {
        const cookieCipher = cookie.get(cookieName);
        const cookieValue = await decryptString(cookieCipher);

        return JSON.parse(cookieValue)[key];
    };

    const removeCookie = (cookieName: string) => {
        cookie.remove(cookieName);
    }

    return useMemo(() => ({
        setCookie,
        getCookie,
        removeCookie,
    }), []);
};
