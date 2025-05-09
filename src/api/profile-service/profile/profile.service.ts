import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepostiory: ProfileRepository,
    private readonly sharedUtilsService: SharedUtilsService
  ) { }

  async addProfile(userInputs: CreateProfileDto, req: Request, uploadedImage: Express.Multer.File): Promise<string> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    const foundProfile = await this.profileRepostiory.countDocument({ user: userId })
    if (foundProfile === 5) {
      throw new BadRequestException('You can create up to 5 profiles only.')
    }

    await this.profileRepostiory.create({
      ...userInputs,
      user: userId
    }, uploadedImage)

    return 'Profile created successfully.'
  }

  async getCurrentProfile(profileId: Types.ObjectId, req: Request): Promise<ProfileDocument | null> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)
    return await this.profileRepostiory.findOne({ _id: profileId, user: userId })
  }

  async getUserProfile(req: Request): Promise<Profile[]> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)
    return await this.profileRepostiory.find({ user: userId })
  }

  async updateMyProfile(
    userInputs: UpdateProfileDto,
    req: Request,
    uploadedImage: Express.Multer.File,
    profileId: Types.ObjectId): Promise<string> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    const foundProfile = await this.profileRepostiory.findOne({ user: userId, _id: profileId })
    if (!foundProfile) {
      throw new NotFoundException('Profile not found!')
    }

    await this.profileRepostiory.findOneAndUpdate(
      { user: userId, _id: profileId },
      userInputs,
      uploadedImage,
      foundProfile.avatar
    )

    return 'Profile updated successfully.'
  }
}