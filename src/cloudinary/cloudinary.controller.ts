import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cloudinary')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  //method to upload image to cloudinary
  uploadImage(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5}),
        new FileTypeValidator({ fileType:'.(png|jpg|jpeg)'}),
      ]
    })
  ) file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Post('uploadurl')
  async uploadImageFromURL(@Body('url') imageUrl: string) {
    return this.cloudinaryService.uploadFromURL(imageUrl);
  }

  @Post('uploadbuffer')
  async uploadImageToCloudinary(
    @Body('imageBuffer') imageBuffer: Buffer,
  ) {
    console.log('imageBuffer', imageBuffer);
    // Aquí, asumo que tu CloudinaryService tiene un método llamado 'uploadImage'
    // que toma un buffer y un tipo MIME y devuelve la URL de la imagen subida.
    const uploadedImageUrl = await this.cloudinaryService.uploadFile2(imageBuffer);

    return { imageUrl: uploadedImageUrl };
  }


}
