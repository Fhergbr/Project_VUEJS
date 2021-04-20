module.exports = middeware =>{
	return (req, res, next) =>{
		if(req.user.admin)
		{
			middeware(req,res,next)
		}else{
			res.status(401).send("Você não possui o acesso necessario!")
		}
	}
}