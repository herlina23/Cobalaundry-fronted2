import { serviceTransact } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class DetailService extends ServiceGenerator<IDetail> {
  protected endpoint = serviceTransact + "api/v1/details/"
}
