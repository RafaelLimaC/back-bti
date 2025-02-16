import { CreatorController } from '@/controller/creatorController';
import { CreatorService } from '@/services/creatorServices';

export function creatorControllerFactory() {
  const creatorService = new CreatorService();
  const creatorController = new CreatorController(creatorService);
  return creatorController;
}
