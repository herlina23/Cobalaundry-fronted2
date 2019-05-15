import { serviceTransact } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class ShowtransService extends ServiceGenerator<IShowtrans> {
  protected endpoint = serviceTransact + "api/v1/transactions/"
}
