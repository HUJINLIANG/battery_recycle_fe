/**
 * Created by jialao on 2016/9/16.
 */
export const API_ROOT = (process.env.NODE_ENV === 'production')?
            'http://noteapi.hjlclould.cn':'';

export const CookieDomain = (process.env.NODE_ENV === 'production')
                            ?".hjlclould.cn":""