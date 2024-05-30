import { del, get, post, put } from "aws-amplify/api";

export const fetchGet = async (apiName: string, path: string) => {
  const { body } = await get({
    apiName: apiName,
    path: path,
  }).response;

  return await body.json();
};

export const fetchPost = async (
  apiName: string,
  path: string,
  payload: Record<string, string>
) => {
  const { body } = await post({
    apiName: apiName,
    path: path,
    options: {
      body: payload,
    },
  }).response;

  return await body.json();
};

export const fetchPut = async (
  apiName: string,
  path: string,
  payload: Record<string, string>
) => {
  const { body } = await put({
    apiName: apiName,
    path: path,
    options: {
      body: payload,
    },
  }).response;

  return await body.json();
};

export const fetchDelete = async (apiName: string, path: string) => {
  await del({
    apiName: apiName,
    path: path,
  }).response;
};
