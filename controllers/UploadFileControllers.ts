// @ts-ignore
import express from 'express';
import cloudinary from '../core/cloudinary';



class UploadFileController {
  async upload(req: any, res: express.Response): Promise<void> {
    const file = req.file;
    try {
      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error || !result) {
          return res.status(500).json({
            status: 'error',
            message: error || 'upload error',
          });
        }

        res.status(201).json(result);
      }).end(file?.buffer);
    } catch (error) {
      res.json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }
}

export const UploadFileCrtl = new UploadFileController();
