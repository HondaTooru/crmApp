export const ActionMenu = ['clue', 'customer', 'contact', 'opportunity', 'contract', 'product', 'payment', 'clueinfo', 'customerinfo', 'opportunitiesinfo', 'plan', 'contactinfo']
export const AddData = ['oppoc', 'oppoaddcontact', 'opportunitiesedit', 'productinfo', 'updatepass', 'center', 'customeraudited', 'common', 'transfer', 'transformc', 'clueAdd', 'customerAdd', 'cluedit', 'contactAdd', 'opportunityAdd', 'contractAdd', 'productAdd', 'received', 'writeclue', 'writecustomer', 'writeopportunities', 'contractaudited', 'writecontract']
export const delBtns = ['notifications']
export const Menus = [
  [{label: '新增线索', link: 'clueAdd'}, {label: '线索查重', link: 'checks/lead'}],
  [{label: '新增客户', link: 'customerAdd'}, {label: '客户查重', link: 'checks/customer'}],
  [{label: '新增联系人', link: 'contactAdd'}, {label: '联系人查重', link: 'checks/contact'}],
  [{label: '新增商机', link: 'opportunityAdd'}],
  [{label: '新增合同', link: 'contractAdd'}],
  [{label: '新增产品', link: 'productAdd'}],
  [{label: '新增回款计划', link: 'Received'}, {label: '新增回款记录', link: 'paymentRecord'}, {label: '新增开票记录', link: 'paymentMark'}],
  [{label: '转成客户', link: 'transformc'}, {label: '转移给他人', link: 'transfer/clue'}],
  [{label: '转移至公海', link: 'common'}, {label: '转移给他人', link: 'transfer/customer'}],
  [{label: '增加联系', link: 'oppoaddcontact/'}, {label: '转成合同 ', link: 'oppoc/'}],
  [{label: '增加回款计划', link: 'Addplan'}],
  [{label: '保存', link: {tag: 'contactinfo'}}, {label: '商机', link: 'contactoppo/'}, {label: '相关联系', link: 'contactabout/'}, {label: '操作日志', link: 'log/contact/'}]
]
export const addBtn = ['task']
export const TaskList = ['打电话给该客户', '发邮件给该客户', '拜访该客户']
export const DropTitle = ['/clue', '/contract', '/contact', '/customer', '/payment', '/opportunity', '/mark']
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
    { key: 3, value: '待审批的回款', tag: { name: 'my_own', value: 0 } }]},
  {defaultVal:
    {key: 0, value: '全部'},
    data: [{ key: 0, value: '全部', tag: { name: '' } },
    {key: 1, value: '线索', tag: { name: 'lead' }},
    {key: 2, value: '客户', tag: { name: 'customer' }},
    {key: 3, value: '商机', tag: { name: 'opportunity' }},
    {key: 4, value: '合同', tag: { name: 'contract' }}]}
]
export const RouterName = ['clue', 'contract', 'contact', 'opportunity', 'customer', 'payment', 'mark']
export const Include = ['apphome', 'mywork', 'common', 'notifications']
