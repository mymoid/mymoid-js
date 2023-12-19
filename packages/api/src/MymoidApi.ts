import { Options } from "./types";

const defaultApiKey = process.env.MYMOID_API_KEY || '';

/**
 * The client for interacting with the MYMOID API.
 */
export default class MymoidApi {
  /**
     * The API key used for authentication.
     */
  private apiKey: string

  /**
   * Creates an instance of the MymoidApi.
   * @param {Options} options - The options object containing the API key.
   * @throws Will throw an error if the API key is not provided.
   */
  public constructor(option: Options = {}) {
    this.apiKey = option.apiKey || defaultApiKey
    
    if (!this.apiKey) {
      throw Error('API key not found.');
    }
  }

  /**
   * Gets the API key used by the client.
   *
   * This function returns the API key that is currently set in the client instance.
   * It is intended for testing purposes to retrieve the API key.
   *
   * @returns {string} The API key used by the client.
   */
  public getApiKey() {
    return this.apiKey
  }

}