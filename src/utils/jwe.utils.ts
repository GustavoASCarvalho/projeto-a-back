import * as jose from 'jose';
import { env } from '../env';

export const JWE_ALG = 'RSA-OAEP-256';

export class JWE {
	async encrypt(data: any): Promise<string> {
		const text = JSON.stringify(data);
		const textEncoded = new TextEncoder().encode(text);
		const publicKey = await this.getPublicKey();
		const encrypted = await new jose.CompactEncrypt(textEncoded)
			.setProtectedHeader({ alg: JWE_ALG, enc: 'A256GCM' })
			.encrypt(publicKey);
		return encrypted;
	}

	async decrypt(data: string): Promise<any> {
		const privateKey = await this.getPrivateKey();
		const decrypted = await jose.compactDecrypt(data, privateKey);
		const textDecoded = new TextDecoder().decode(decrypted.plaintext);
		const text = JSON.parse(textDecoded);
		return text;
	}

	private async getPublicKey(): Promise<jose.KeyLike> {
		const publicKey = await jose.importSPKI(env.PUBLIC_KEY!, JWE_ALG);
		return publicKey;
	}

	private async getPrivateKey(): Promise<jose.KeyLike> {
		const privateKey = await jose.importPKCS8(env.PRIVATE_KEY!, JWE_ALG);
		return privateKey;
	}
}
