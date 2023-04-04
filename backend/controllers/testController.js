
const prueba_test = async function (req, res) {
  res.status(200).send({
    ok: true,
    message: 'Hola TESt'
  })
}



module.exports = {
  prueba_test
}