/**
 * Created by kennyhu on 2018/4.
 */
//.hjlclould.cn
export const API_ROOT = (process.env.NODE_ENV === 'production')?
    'http://119.29.0.196:80/2018_recycle_mini_api':'http://119.29.0.196:80/2018_recycle_mini_api';

export const CookieDomain = (process.env.NODE_ENV === 'production')
                            ?"":""