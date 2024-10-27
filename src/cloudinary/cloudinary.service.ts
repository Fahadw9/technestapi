import { Injectable, Logger } from '@nestjs/common';
import { Cloudinary } from 'cloudinary-core';
import * as Multer from 'multer';
import { promises as fsPromises } from 'fs';
import { join } from 'path';

@Injectable()
export class CloudinaryService {
  private cloudinary;
  private readonly logger = new Logger(CloudinaryService.name);

  constructor() {
    this.cloudinary = require('cloudinary').v2;
    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Multer.File): Promise<string> {
    try {
      // Upload the image to Cloudinary
      const result = await this.cloudinary.uploader.upload(file.path, {
        folder: 'uploads', // Change the folder name as needed
      });
      
      // Delete the local file after successful upload
      await this.deleteLocalFile(file.path);

      return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      this.logger.error('Error uploading image to Cloudinary', error);
      throw error; // Rethrow the error for handling elsewhere
    }
  }

  private async deleteLocalFile(filePath: string): Promise<void> {
    try {
      await fsPromises.unlink(filePath); // Delete the file
      this.logger.log(`Deleted local file: ${filePath}`);
    } catch (error) {
      this.logger.error(`Failed to delete local file: ${filePath}`, error);
    }
  }
}
