import * as OTPAuth from "otpauth";
import { useAuthStore } from "#imports";
import { CompactEncrypt } from "jose";

export async function useEncrypt(payload: string) {
    const auth = useAuthStore();
    const dailySecret = auth.secret as string;

    const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromHex(dailySecret),
        digits: 8,
        period: 30,
    });
    const token = totp.generate();
    const verify = auth.verify;
    const jwe = await encryptWithTotp(dailySecret, token, payload);

    return {
        token,
        verify,
        payload: jwe,
    };
}

async function deriveKey(dailySecret: string, totp: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${dailySecret}:${totp}`);
    const hash = await crypto.subtle.digest("SHA-256", data); // ArrayBuffer 32 bytes
    return new Uint8Array(hash);
}

async function encryptWithTotp(
    dailySecret: string,
    totp: string,
    payloadStr: string
) {
    const key = await deriveKey(dailySecret, totp); // Uint8Array(32)
    const encoder = new TextEncoder();
    const plaintext = encoder.encode(payloadStr);

    const jwe = await new CompactEncrypt(plaintext)
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .encrypt(key);

    return jwe;
}
