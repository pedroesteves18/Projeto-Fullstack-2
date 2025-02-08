import validator from 'validator'
import xss from 'xss'
export default {
    sanitize(params){
        const sanitized = {}
        let injection = false
        for(let key in params){
            sanitized[key] = validator.escape(params[key])
            sanitized[key] = xss(sanitized[key])
            if(sanitized[key] !== params[key]){
                injection = true
            }
        }

        if(injection){
            sanitized.msg = "Injection attempt detected!"
        }
        
        return sanitized
    }

};