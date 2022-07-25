/**
 * @author yangling
 * @date 2021/12/10 9:34 AM
 */
import request from "../utils/request";

/**
 * ApiName 用户注册接口
 * @param data
 * @returns {AxiosPromise}
 */
export const register = (data = {})=>{
    return request({
        url : "/user/reg",
        method : "POST",
        data
    })
}

/**
 * ApiName 用户登录接口
 * @param username
 * @param password
 * @returns {AxiosPromise}
 */
export const login = (username,password) =>{
    return request({
        url : "/user/login",
        method : "POST",
        data : {
            username,
            password
        }
    })
}

/**
 * ApiName 用户退出登录接口
 * @returns {AxiosPromise}
 */
export const logout = () =>{
    return request({
        url : "/admin/user/logout",
        method : "POST"
    })
}

/**
 * ApiName 获取用户信息和权限菜单
 * @returns {AxiosPromise}
 */
export const userInfo = ()=>{
    return request({
        url : "/admin/user/info",
        method : "GET"
    })
}