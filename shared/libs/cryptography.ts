const _arrayBufferFromHexString = (hexString: string) => {
    const bytes = Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16)));
    return bytes.buffer;
}

const SECRET_ENCRYPTOR: string = process.env.NEXT_PUBLIC_SECRET_ENCRYPTER || '';
const IV: string = process.env.NEXT_PUBLIC_SECRET_IV || '';
const ivUint8Array: Uint8Array = new Uint8Array(
    [...atob(IV)].map((char) => char.charCodeAt(0))
);
const keyArrayBuffer = _arrayBufferFromHexString(SECRET_ENCRYPTOR);

export const encryptString = async (plaintext: string) => {
    const encodedPlaintext = new TextEncoder().encode(plaintext);
    const secretKey = await crypto.subtle.importKey('raw', keyArrayBuffer, {
        name: 'AES-CBC',
        length: 256
    }, true, ['encrypt', 'decrypt']);

    const algorithm = {
        name: "AES-CBC",
        iv: ivUint8Array,
    };

    const ciphertext = await crypto.subtle.encrypt(algorithm, secretKey, encodedPlaintext);
    const uint8Array = new Uint8Array(ciphertext);
    const uintString = String.fromCharCode(...uint8Array);

    return btoa(uintString);
}

export const decryptString = async (ciphertext: string) => {
        const string = atob(ciphertext);
        const secretKey = await crypto.subtle.importKey('raw', keyArrayBuffer, {
            name: 'AES-CBC',
            length: 256
        }, true, ['encrypt', 'decrypt']);
    
    
        const uintArray = new Uint8Array(
            [...string].map((char) => char.charCodeAt(0))
        );
    
    
        const algorithm = {
            name: "AES-CBC",
            iv: ivUint8Array,
        };
        const decryptedData = await window.crypto.subtle.decrypt(
          algorithm,
          secretKey,
          uintArray
        );
    
        return new TextDecoder().decode(decryptedData);
}