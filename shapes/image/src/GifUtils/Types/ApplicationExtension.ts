export interface ApplicationExtension {
    /**
     * 3 bytes to authenticate the application identifier
     */
    authenticationCode: string;

    /**
     * the data of this application extension
     */
    data: Uint8Array;

    /**
     * 8 character string identifying the application
     */
    identifier: string;
}
