import { OwnerController } from '@/controller/ownerController';
import { OwnerService } from '@/services/ownerServices';

export function ownerControllerFactory() {
  const ownerService = new OwnerService();
  const ownerController = new OwnerController(ownerService);
  return ownerController;
}
