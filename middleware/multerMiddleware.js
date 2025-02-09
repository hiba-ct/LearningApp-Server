const multer =require ('multer')

const storage =multer.diskStorage({
    destination:(req,file,callback)=>{
callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
        
    }
})//filefilter

  /* const filefilter=(req,file,callback)=>{
   
}   */

     const multerMiddleware = multer({
        storage
    })

    module.exports = multerMiddleware 