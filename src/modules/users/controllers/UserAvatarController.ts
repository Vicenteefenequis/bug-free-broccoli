import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const avatarFilename = request.file?.filename;

    if (!avatarFilename) {
      return response
        .status(400)
        .json({ error: 'Avatar filename is required' });
    }

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename,
    });

    return response.json(user);
  }
}
