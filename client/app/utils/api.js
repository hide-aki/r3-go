import { camelizeKeys } from 'humps';
import { merge, mergeWith } from 'ramda';

const baseOptions =
  { method: 'GET',
    headers: { 'Content-Type': 'application/json' } };

function deauthorize(authToken) {
  const endpoint = `${API_URL}/v1/logout`; /* global API_URL */
  const mergedOptions = addAuth(authToken, merge(baseOptions, { method: 'DELETE' }));

  return fetch(endpoint, mergedOptions, authToken).then(checkStatus);
}

function authorize(email, password) {
  const endpoint = `${API_URL}/v1/login`; /* global API_URL */
  const body = JSON.stringify({ email, password, grantType: 'password' });
  const mergedOptions = merge(baseOptions, { method: 'POST', body });

  return request(endpoint, mergedOptions);
}

function fbAuthorize(token, userId, moreData) {
  const endpoint = `${API_URL}/v1/login`; /* global API_URL */
  const body = JSON.stringify({ token, userId, ...moreData, grantType: 'facebook' });
  const mergedOptions = merge(baseOptions, { method: 'POST', body });

  return request(endpoint, mergedOptions);
}

function fetchBasicUserInfo(authToken) {
  const endpoint = `${API_URL}/v1/user`; /* global API_URL */
  const mergedOptions = addAuth(authToken, baseOptions);

  return request(endpoint, mergedOptions);
}

function fetchAccountInfo() { // authToken) {
  // this should look like the fetchBasicUserInfo request
  // but is used to fetch complete account info

  console.log('called fetchAccountInfo (placeholder)');
}

function genericRequest(url) {
  return request(url);
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function addAuth(authToken, options) {
  const newOptions = mergeWith(merge, { headers: {
    Authorization: `Bearer ${authToken}`,
  } }, options);
  return newOptions;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(camelizeKeys);
}

export default {
  authorize,
  deauthorize,
  fbAuthorize,
  fetchBasicUserInfo,
  fetchAccountInfo,
  genericRequest,
};
