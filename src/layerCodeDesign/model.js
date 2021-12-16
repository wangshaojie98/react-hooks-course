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