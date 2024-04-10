import jwt from "jsonwebtoken"

export function validateToken(req, res, next){
    const accessToken = req.headers["authorization"]
    console.log(accessToken)
    if (!accessToken){
        return res.send("Access denied")
    }else{
        jwt.verify(accessToken, "franco", (error, user)=>{
            if(error){
                res.send("Invalid token")
            }else{
                next()
            }
            
        })
    }
}