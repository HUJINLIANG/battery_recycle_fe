/**
 * Created by kennyhu on 2018/4.
 */
import createLogger from 'vuex/logger'

export default process.env.NODE_ENV !== 'production'
            ?[createLogger()]
            :[]