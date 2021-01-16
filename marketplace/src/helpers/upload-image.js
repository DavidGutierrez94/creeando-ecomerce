import axios from "axios";
import Resizer from "react-image-file-resizer";

export const resizeImageAndUpload = async (image, callback, token) => {
   return await Resizer.imageFileResizer(
        image,
        720,
        720,
        "JPEG",
        100,
        0,
        async (uri) => {
            // console.log(uri);
            try {
                const { data } = await axios.post(
                        `${process.env.REACT_APP_API}/uploadimages-brand`,
                        { image: uri },
                        {
                            headers: {
                                authtoken: token || "",
                            },
                        }
                    )
                    console.log(data)
                    callback(data);
            } catch (error) {

                console.log("CLOUDINARY UPLOAD ERR", error);
            }
        },
        "base64"
    );
}
export const removeImageBack = async (public_id, callback, token) => {
    try {
        
        await axios
        .post(
          `${process.env.REACT_APP_API}/removeimage-brand`,
          { public_id },
          {
            headers: {
              authtoken: token || "",
            },
          }
        )
        callback(null)
    } catch (error) {
        console.log(error)
    }
}