import jwt from "jsonwebtoken"

export function validateToken(req, res, next){
    const accessToken = req.headers["authorization"]
    console.log(accessToken)
    if (!accessToken){
        return res.status(401).res.json({"access": "denied"})
    }else{
        jwt.verify(accessToken, "franco", (error, user)=>{
            if(error){
                res.status(401).res.send("Invalid token")
            }else{
                next()
            }
            
        })
    }
}