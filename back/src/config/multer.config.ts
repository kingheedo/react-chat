import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import multerS3 from 'multer-s3';
import { basename, extname } from 'path';

export const multerOptionsFactory = (configService: ConfigService) => ({
  storage: multerS3({
    s3: new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    }),
    bucket: configService.get('AWS_BUCKET_NAME'),
    key(req, file, callback) {
      const ext = extname(file.originalname);
      const baseName = basename(file.originalname, ext);
      const fileName = `${baseName}_${Date.now()}${ext}`;

      callback(null, fileName);
    },
  }),
});
