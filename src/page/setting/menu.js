export const ActionMenu = ['clue', 'customer', 'contact', 'opportunity', 'contract', 'product', 'payment', 'clueinfo']
export const AddData = ['clueAdd', 'customerAdd', 'cluedit', 'contactAdd', 'opportunityAdd', 'contractAdd', 'productAdd', 'received', 'writeclue']
export const Menus = [
  [{label: '新增线索', link: 'clueAdd'}],
  [{label: '新增客户', link: 'customerAdd'}],
  [{label: '新增联系人', link: 'contactAdd'}],
  [{label: '新增商机', link: 'opportunityAdd'}],
  [{label: '新增合同', link: 'contractAdd'}],
  [{label: '新增产品', link: 'productAdd'}],
  [{label: '新增回款计划', link: 'Received'}, {label: '新增回款记录', link: 'paymentRecord'}, {label: '新增开票记录', link: 'paymentMark'}],
  [{label: '转成客户', link: 'transformc'}, {label: '转移给他人', link: 'transformo'}]
]
export const addBtn = ['task']
export const TaskList = ['打电话给该客户', '发邮件给该客户', '拜访该客户']
export const DropTitle = ['/clue', '/contract', '/contact', '/customer', '/payment', '/opportunity']
export const OptionsTime = [ { value: '0', name: '准时' }, {value: '5', name: '提前5分钟'}, {value: '155', name: '提前15分钟'}, {value: '30', name: '提前30分钟'}, {value: '60', name: '提前1小时'}, {value: '120', name: '提前2小时'}, {value: '1440', name: '提前1天'}, {value: '2880', name: '提前2天'} ]
