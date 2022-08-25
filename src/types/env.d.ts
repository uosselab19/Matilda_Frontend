declare namespace NodeJS {
	interface ProcessEnv {
		IMAGESTORAGE: string;
		rpcURL: string;
		providerURL: string;
		address: string;
		privateKey: string;
	}
}