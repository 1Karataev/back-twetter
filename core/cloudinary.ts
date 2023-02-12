import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'dlaqpur9j',
  api_key: process.env.CLOUDINARY_API_KEY || '143743733924915',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'u69iDb4uDIUpbviQmDARMJqzCjw',
  secure: true
});

export default cloudinary;