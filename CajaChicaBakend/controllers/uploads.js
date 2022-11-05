const Personal = require('../models/personal');

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name : 'caluyowilder' , 
    api_key : '686699168955359' , 
    api_secret : 'da2Oks3XgtD_JLxhBNLltfebVv8' ,
    seguro : true
})

const actualizarImagenCloudinary = async(req=request, res)=>{

    const {id} = req.params
    //verificamos el usuario
    const usuario = await Personal.findByPk(id)
    
    //limpiamos las imagenes
    if(usuario.avatar){
        const nombreArr = modelo.img.split('/')
        const nombre = nombreArr[nombreArr.length -1]
        const [public_id] = nombre.split('.')
        cloudinary.uploader.destroy(public_id)
    }
    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

    await Personal.update({
        avatar: secure_url
    } ,{where: {
            CI: id
        }
    })
    res.json({
        url: secure_url
    })

}

module.exports = {
    actualizarImagenCloudinary
}