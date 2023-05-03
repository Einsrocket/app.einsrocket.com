import CryptoJS from "crypto-js";

export const useDecript = () => {
    let enciptedData = localStorage.getItem("@skylab-einsrocket") as any;

    // Decrypt
    let bytes = CryptoJS.AES.decrypt(
        enciptedData,
        import.meta.env.VITE_CRIPTOJS_SECRET
    );

    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
};
