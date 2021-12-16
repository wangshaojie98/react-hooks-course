// class TransferController {
//   static model = TransferModel
//   static service = TransferService

//   async init(id) {
//     const data = await this.service.getTransfer(id)
//     this.model.setData(id, data)
//   }

//   async submit() {
//     const data = this.model.getData()
//     await this.service.submitTransfer(this.model.id, data)
//   }
// }