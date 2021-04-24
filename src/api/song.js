import {commonParams,options} from "./config";
import axios from 'axios';
import jsonp from "../common/js/jsonp";

export function getLyric(id) {
  const url = "/api/lyric"
  const data = Object.assign({},commonParams,{
    musicid: id,
    platform: 'h5',
    uin:0,
    songtype:0,
    needNewCode: 1,
    _: +new Date(),
    format: 'json',
    nobase64:1,
    jsonpCallback:'jsonp1'
  })

  return axios.get(url,{
    params:data,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getLyric2(id) {
  const url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg"
  const data = Object.assign({}, commonParams ,{
    uin:0,
    format:'json',
    notice:0,
    platform:'h5',
    needNewCode:1,
    nobase64:1,
    musicid:id,
    songtype:0,
    _:+new Date()
  })

  return jsonp(url,data,options)
}
