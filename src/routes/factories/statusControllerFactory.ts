import { StatusController } from '@/controller/statusController';
import { StatusService } from '@/services/statusServices';

export function statusControllerFactory() {
  const statusService = new StatusService();
  const statusController = new StatusController(statusService);
  return statusController;
}
