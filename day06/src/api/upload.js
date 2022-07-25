/**
 * @author YangLing
 * @date 2021/12/11 1:56 PM
 */

import request from "../utils/request";
import * as Qs from "querystring"

export const uploadSingle = (fileData, callback) => {
  return request({
    url: "/upload_single",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: function (progressEvent) {
      const loaded = progressEvent.loaded;
      const total = progressEvent.total;
      callback && callback(loaded, total);
    },
    data: fileData,
  });
};

export const uploadSingleBase64 = (fileData) => {
  return request({
    url: "/upload_single_base64",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data:Qs.stringify(fileData),
  });
};

/**
 *
 * @param fileData type:FormData
 * @returns {AxiosPromise}
 */
export const uploadSingleName = (fileData)=> {
  return request({
    url : "/upload_single_name",
    method : "POST",
    headers : {
      "Content-Type" : "multipart/form-data"
    },
    data : fileData
  })
}

//获取已经上传的切片
export const uploadAlready = (HASH)=>{
  return request({
    url : "/upload_already",
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    },
    params : {
      HASH
    }
  })
}

//上传切片
export const uploadChunk = (fileData)=>{
  return request({
    url : "/upload_chunk",
    method : "POST",
    headers : {
      "Content-Type" : "multipart/form-data"
    },
    data : fileData
  })
}

//合并切片
export const uploadMerge = (fileData)=>{
  return request({
    url : "/upload_merge",
    method : "POST",
    headers : {
      "Content-Type" : "application/x-www-form-urlencoded"
    },
    data : Qs.stringify(fileData)
  })
}