module.exports = function(app){

    var router = app.loopback.Router();
    var Empresa = app.models.Empresa;
    var Userbase = app.models.Userbase;
    var Promocion = app.models.Promocion;

    router.get('/login',function(req,res){
	return res.render('login');
    });

    router.post('/usuarioVerificar',function(req,res){
	Empresa.login({
	    email: req.body.form_email,
	    password: req.body.form_password
	},function(err, token){
	    if(err){
		return res.sendStatus(404);
	    }

	    Empresa.findById(token.userId,function(err, objEmpresa){
		if(err) return res.sendStatus(404);
		console.log("empresa : ",objEmpresa);
		return res.render('principal',{
		    objEmpresa: objEmpresa
		});
	    });
	});
    });

    router.post('/crearPromocion',function(req,res){
	var nuevaPromocion = {
	    nombre: req.body.nombre,
	    descripcion: req.body.descripcion,
	    costo: req.body.costo,
	    puntos: req.body.puntos,
	    direccion: JSON.parse(req.body.autocompletado)
	    
	}

	Promocion.create(nuevaPromocion,function(err,objPromocion){
	    if(err) return res.sendStatus(404);
	    return res.render('success');
	});
	
    })

    router.get('/crearEmpresa',function(req,res){
	return res.render('crearEmpresa');
    })

    router.get('/principal',function(req,res){
	return res.render('principal');
    })
    
    app.use(router);
    
}