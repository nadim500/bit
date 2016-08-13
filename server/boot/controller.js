module.exports = function(app){

    var router = app.loopback.Router();
    var Empresa = app.models.Empresa;
    var Userbase = app.models.Userbase;
    var Promocion = app.models.Promocion;

    var promociones = [
	{
	    nombre: "2 x 1 en Zapatos",
	    descripcion: "Dos por uno en zapatos",
	    puntos: 20,
	    costo: 10,
	    direccion: {
		lat: -12.046374,
		lng: -77.042793
	    }
	},{
	    nombre: "1 x 1 en Medias",
	    descripcion: "Dos por uno en medias",
	    puntos: 200,
	    costo: 101,
	    direccion: {
		lat: -12.046374,
		lng: -77.042793
	    }
	},{
	    nombre: "Chullos de lana 50%",
	    descripcion: "al 50 porciento",
	    puntos: 202,
	    costo: 10,
	    direccion: {
		lat: -12.046374,
		lng: -77.042793
	    }
	},{
	    nombre: "Billetera para hombre 30% de descuento",
	    descripcion: "Mejor cuero de calidad",
	    puntos: 20,
	    costo: 10,
	    direccion: {
		lat: -12.046374,
		lng: -77.042793
	    }
	},{
	    nombre: "4 curaciones dentales a 35 soles",
	    descripcion: "Sonrisa perfecta",
	    puntos: 20,
	    costo: 10,
	    direccion: {
		lat: -12.046374,
		lng: -77.042793
	    }
	}
    ];

    Promocion.create(promociones,function(err,prom){
	if(err) return res.sendStatus(404);
	console.log("todo Creado");
    })    

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
	console.log("imagen : ", req.body.imagen);
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
    });

    router.get('/actualizarPointUser',function(req,res){
	var userId = req.query.userId;
	var puntos = parseInt(req.query.puntos);
	var empresaId = req.query.empresaId;
	Userbase.findById(userId, function(err, userbase){
	    if(err) return res.sendStatus(404);
	    if(!userbase.points[empresaId]){
		userbase.points[empresaId] = puntos;
	    }else{
		userbase.points[empresaId] += puntos;
	    }
	    userbase.save();
	    console.log("fin actualizacion");
	});
    });

    router.get('/crearEmpresa',function(req,res){
	return res.render('crearEmpresa');
    })

    router.get('/principal',function(req,res){
	return res.render('principal');
    })
    
    app.use(router);
    
}
