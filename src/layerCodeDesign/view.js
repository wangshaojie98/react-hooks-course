class Account {
  static default = ''
  static type = 'numeric'
}

class Amount {
  static default = 0
  static type = 'number'
}

class TransferModel {
  id = ''
  static from = Account
  static to = Account
  static amount = Amount
}

class TransferService {
  submitTransfer(id, data) {
    // ...
  }
  getTransfer(id) {
    // ...
  }
}


class TransferController {
  static model = TransferModel
  static service = TransferService

  async init(id) {
    const data = await this.service.getTransfer(id)
    this.model.setData(id, data)
  }

  async submit() {
    const data = this.model.getData()
    await this.service.submitTransfer(this.model.id, data)
  }
}


class TransferView extends React.Component {
  controller = new TransferController()
  componentDidMount() {
    const { id } = this.props
    this.controller.init(id)
  }
  render() {
    return (
      <button onClick={() => this.controller.submit()}>transfer</button>
    )
  }
}