import { storage } from "@/firebase/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export const uploadFile = async(file: File) => {
    const date = new Date()
    const filename = `${file.name.split('.')[0]}_${date.toString()}.${file.name.split('.').pop()}`;
    let folder = '';
    console.log(file)
    if (file.type.startsWith('image/')) {
        folder = 'images';
    } else if (file.type.startsWith('audio/') || file.type.startsWith("application/octet-stream")) {
        folder = 'audio';
    }
    const storageRef = ref(storage, `${folder}/${filename}`);
    await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(storageRef)
    return url
}