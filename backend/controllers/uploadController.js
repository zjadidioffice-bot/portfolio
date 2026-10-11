function uploadImage(req,res){
    if(!req.file)
    {
        return res.status(400).json({
            message:"please select image"
        });
    }
    const imageUrl=`/uploads/${req.file.fileName}`;

    return res.status(201).json({
        message:"image uploaded successfully",
        imageUrl:imageUrl,
        fileName:req.file.filename
    });
}
module.exports={uploadImage};