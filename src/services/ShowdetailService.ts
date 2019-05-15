import axios from "axios"
import { serviceTransact } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class ShowdtlService extends ServiceGenerator<IShowdtl> {
  protected endpoint = serviceTransact + "api/v1/details/"

  public get() {
    const { _id } = JSON.parse(localStorage.getItem("transaction")!)
    return new Promise<IShowdtl[]>((resolve, reject) => {
      axios
        .get(this.endpoint + _id, { headers: this.getHeader() })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  public create(input: IShowdtl) {
    const { _id } = JSON.parse(localStorage.getItem("transaction")!)
    input.transaction = _id
    return new Promise<IShowdtl>((resolve, reject) => {
      axios
        .post(this.endpoint, input, { headers: this.getHeader() })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}
