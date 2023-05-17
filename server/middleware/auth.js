import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    console.log(req.headers.authorization)
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500;

        let decodeData;
        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, 'secret-key')
            req.userId = decodeData?.id
        } else {
            decodeData = jwt.decode(token)
            req.userId = decodeData?.sub;
        }
        next();
    } catch (error) {
        console.log(error)
    }
}
 
export default auth