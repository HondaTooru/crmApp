export const ActionMenu = ['clue', 'customer', 'contact', 'opportunity', 'contract', 'product', 'payment', 'clueinfo']
export const AddData = ['cluetransfer', 'transformc', 'clueAdd', 'customerAdd', 'cluedit', 'contactAdd', 'opportunityAdd', 'contractAdd', 'productAdd', 'received', 'writeclue']
export const delBtn = ['CustomerAudited']
export const Menus = [
  [{label: '新增线索', link: 'clueAdd'}],
  [{label: '新增客户', link: 'customerAdd'}],
  [{label: '新增联系人', link: 'contactAdd'}],
  [{label: '新增商机', link: 'opportunityAdd'}],
  [{label: '新增合同', link: 'contractAdd'}],
  [{label: '新增产品', link: 'productAdd'}],
  [{label: '新增回款计划', link: 'Received'}, {label: '新增回款记录', link: 'paymentRecord'}, {label: '新增开票记录', link: 'paymentMark'}],
  [{label: '转成客户', link: 'transformc'}, {label: '转移给他人', link: 'cluetransfer'}]
]
export const addBtn = ['task']
export const TaskList = ['打电话给该客户', '发邮件给该客户', '拜访该客户']
export const DropTitle = ['/clue', '/contract', '/contact', '/customer', '/payment', '/opportunity']
export const OptionsTime = [
  { value: '0', name: '准时' },
  {value: '5', name: '提前5分钟'},
  {value: '155', name: '提前15分钟'},
  {value: '30', name: '提前30分钟'},
  {value: '60', name: '提前1小时'},
  {value: '120', name: '提前2小时'},
  {value: '1440', name: '提前1天'},
  {value: '2880', name: '提前2天'} ]

export const List = [
  {defaultVal:
      {key: 0, value: '全部线索'},
    data: [
      { key: 0, value: '全部线索', tag: { name: 'my_own', value: 0 } },
      { key: 1, value: '我的线索', tag: { name: 'my_own', value: 1 } },
      { key: 2, value: '已转客户线索', tag: { name: 'my_own', value: 2 } }]},
  {defaultVal:
      { key: 0, value: '全部合同' },
    data: [{ key: 0, value: '全部合同', tag: { name: 'my_own', value: 0 } },
    { key: 1, value: '我的合同', tag: { name: 'my_own', value: 1 } },
    { key: 2, value: '我的协作合同', tag: { name: 'cooper', value: 1 } }]},
  {defaultVal:
      {key: 0, value: '全部联系人'},
    data: [{ key: 0, value: '全部联系人', tag: { name: 'my_own', value: 0 } }, { key: 1, value: '我的联系人', tag: { name: 'my_own', value: 1 } },
    { key: 2, value: '我的协作联系人', tag: { name: 'cooper', value: 1 } }]},
  {defaultVal:
      {key: 0, value: '全部商机'},
    data: [{ key: 0, value: '全部商机', tag: { name: 'my_own', value: 0 } },
    { key: 1, value: '我的商机', tag: { name: 'my_own', value: 1 } },
    { key: 2, value: '我的协作商机', tag: { name: 'cooper', value: 1 } }]},
  {
    defaultVal: {
      key: 0, value: '全部客户'},
    data: [
      { key: 0, value: '全部客户', tag: { name: 'my_own', value: 0 } },
      { key: 1, value: '我的客户', tag: { name: 'my_own', value: 1 } },
      { key: 2, value: '我的协作客户', tag: { name: 'cooper', value: 1 } },
      { key: 3, value: '待审批的客户', tag: { name: 'to_be_approved', value: 1 } }]},
  {defaultVal:
      {key: 0, value: '回款计划'},
    data: [{ key: 0, value: '回款计划', tag: { name: 'my_own', value: 0 } },
    { key: 1, value: '回款记录', tag: { name: 'my_own', value: 0 } },
    { key: 2, value: '开票记录', tag: { name: 'my_own', value: 0 } },
    { key: 3, value: '待审批的回款', tag: { name: 'my_own', value: 0 } }]}
]
export const RouterName = ['clue', 'contract', 'contact', 'opportunity', 'customer', 'payment']
