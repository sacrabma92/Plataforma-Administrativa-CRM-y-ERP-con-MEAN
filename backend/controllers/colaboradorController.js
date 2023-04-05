var Colaborador = require('../models/Colaborador');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt')


const registro_colaborador_admin = async function (req, res) {
  if(req.user ){
    let data = req.body;
    try {

      var colaboradores = await Colaborador.find({ email: data.email });

      bcrypt.hash('123456789', null, null, async function (err, hash) {
        if (err) {
          res.status(200).send({ data: undefined, message: 'No se pudo generar la contraseña' })
        } else {
          if (colaboradores.length >= 1) {
            res.status(200).send({ data: undefined, message: 'El correo electronico ya existe.' })
          } else {
            data.fullnames = data.nombres + ' ' + data.apellidos;
            data.password = hash;
            let colaborador = await Colaborador.create(data);
            res.status(200).send({ data: colaborador })
          }
        }
      });

    } catch (error) {
      res.status(200).send({ data: undefined, message: 'Verifique los campos del formulario.' })
    }
  }else{
    res.status(403).send({ data: undefined, message: 'NoTken' })
  }
}

const login_admin = async function (req, res) {

  let data = req.body;
  var colaboradores = await Colaborador.find({ email: data.email });

  if (colaboradores.length >= 1) {
    // Si hay cuenta
    if (colaboradores[0].estado) {
      bcrypt.compare(data.password, colaboradores[0].password, async function (err, check) {
        if (check) {
          res.status(200).send({
            data: colaboradores[0],
            token: jwt.createToken(colaboradores[0])
          })
        } else {
          res.status(200).send({ data: undefined, message: 'La contraseña es incorrecta' })
        }
      });
    } else {
      res.status(200).send({ data: undefined, message: 'No tiene acceso al panel' })
    }
  } else {
    res.status(200).send({ data: undefined, message: 'El correo electronico no existe' })
  }

}

const listar_colaboradores_admin = async function( req, res){
  if(req.user){
    let colaboradores = await Colaborador.find();
    res.status(200).send({data:colaboradores});
  }else{
    res.status(403).send({ data: undefined, message: 'NoTken' })
  }
}

const cambiar_estado_colaborador_admin = async function( req, res){
  if(req.user){
    let id = req.params['id'];
    let data = req.body;

    let nuevo_estado;

    if(data.estado){
      nuevo_estado = false
    }else if(!data.estado){
      nuevo_estado = true;
    }

    let colaborador = await Colaborador.findByIdAndUpdate({_id: id}, {
      estado: nuevo_estado
    });

    res.status(200).send({ data:colaborador })

  }else{
    res.status(403).send({ data: undefined, message: 'NoTken' })
  }
}

module.exports = {
  registro_colaborador_admin,
  login_admin,
  listar_colaboradores_admin,
  cambiar_estado_colaborador_admin
}