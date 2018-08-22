declare var M

export class MeterialService {
  static toast(message: string) {
    M.toast({html: message})
  }
}