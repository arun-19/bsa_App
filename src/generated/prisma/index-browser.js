
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  password: 'password',
  Idcard: 'Idcard',
  roleId: 'roleId',
  otp: 'otp',
  hod: 'hod',
  verificationOtp: 'verificationOtp',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  active: 'active',
  employeeId: 'employeeId',
  isAllParty: 'isAllParty',
  isAdmin: 'isAdmin',
  fcm: 'fcm'
};

exports.Prisma.CompanyCodeScalarFieldEnum = {
  id: 'id',
  Idcard: 'Idcard',
  companyCode: 'companyCode'
};

exports.Prisma.PermissionDocIDScalarFieldEnum = {
  id: 'id',
  count: 'count'
};

exports.Prisma.PermissionEntryScalarFieldEnum = {
  id: 'id',
  createdOn: 'createdOn',
  createdBy: 'createdBy',
  modifiedOn: 'modifiedOn',
  isCancelled: 'isCancelled',
  userId: 'userId',
  compCode: 'compCode',
  docid: 'docid',
  docDate: 'docDate',
  fTime: 'fTime',
  tTime: 'tTime',
  thrs: 'thrs',
  permissionId: 'permissionId',
  reason: 'reason',
  approvalStatus: 'approvalStatus',
  hod: 'hod'
};

exports.Prisma.PageScalarFieldEnum = {
  id: 'id',
  name: 'name',
  link: 'link',
  type: 'type',
  active: 'active',
  pageGroupId: 'pageGroupId'
};

exports.Prisma.InfoTermScalarFieldEnum = {
  id: 'id',
  name: 'name',
  branchId: 'branchId',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.ArticleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isDefault: 'isDefault',
  companyId: 'companyId',
  active: 'active',
  selectedType: 'selectedType'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  code: 'code',
  gstNo: 'gstNo',
  panNo: 'panNo',
  contactName: 'contactName',
  contactMobile: 'contactMobile',
  contactEmail: 'contactEmail',
  bankName: 'bankName',
  accNo: 'accNo',
  branchName: 'branchName',
  ifscCode: 'ifscCode',
  active: 'active'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  validFrom: 'validFrom',
  expireAt: 'expireAt',
  code: 'code',
  maxUsers: 'maxUsers'
};

exports.Prisma.PortionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.BranchScalarFieldEnum = {
  id: 'id',
  branchName: 'branchName',
  branchCode: 'branchCode',
  contactName: 'contactName',
  contactMobile: 'contactMobile',
  contactEmail: 'contactEmail',
  companyId: 'companyId',
  active: 'active',
  idPrefix: 'idPrefix',
  idSequence: 'idSequence',
  tempPrefix: 'tempPrefix',
  tempSequence: 'tempSequence',
  prefixCategory: 'prefixCategory',
  address: 'address',
  gstNo: 'gstNo',
  panNo: 'panNo',
  logo: 'logo'
};

exports.Prisma.UserOnBranchScalarFieldEnum = {
  id: 'id',
  branchId: 'branchId',
  userId: 'userId'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  companyId: 'companyId',
  active: 'active',
  defaultRole: 'defaultRole'
};

exports.Prisma.RoleOnPageScalarFieldEnum = {
  id: 'id',
  roleId: 'roleId',
  pageId: 'pageId',
  read: 'read',
  create: 'create',
  edit: 'edit',
  delete: 'delete'
};

exports.Prisma.UserAdminDetScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  userAdminId: 'userAdminId',
  label: 'label'
};

exports.Prisma.UserPartyDetailsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  partyId: 'partyId'
};

exports.Prisma.EmployeeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  regNo: 'regNo',
  chamberNo: 'chamberNo',
  departmentId: 'departmentId',
  joiningDate: 'joiningDate',
  fatherName: 'fatherName',
  dob: 'dob',
  gender: 'gender',
  maritalStatus: 'maritalStatus',
  bloodGroup: 'bloodGroup',
  panNo: 'panNo',
  consultFee: 'consultFee',
  salaryPerMonth: 'salaryPerMonth',
  commissionCharges: 'commissionCharges',
  mobile: 'mobile',
  accountNo: 'accountNo',
  ifscNo: 'ifscNo',
  branchName: 'branchName',
  degree: 'degree',
  specialization: 'specialization',
  localAddress: 'localAddress',
  localCityId: 'localCityId',
  localPincode: 'localPincode',
  permAddress: 'permAddress',
  permCityId: 'permCityId',
  permPincode: 'permPincode',
  active: 'active',
  image: 'image',
  branchId: 'branchId',
  employeeCategoryId: 'employeeCategoryId',
  permanent: 'permanent',
  leavingReason: 'leavingReason',
  leavingDate: 'leavingDate',
  canRejoin: 'canRejoin',
  rejoinReason: 'rejoinReason'
};

exports.Prisma.FinYearScalarFieldEnum = {
  id: 'id',
  from: 'from',
  to: 'to',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.EmployeeCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  branchId: 'branchId',
  active: 'active',
  defaultCategory: 'defaultCategory'
};

exports.Prisma.CountryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  active: 'active',
  companyId: 'companyId'
};

exports.Prisma.CommercialScalarFieldEnum = {
  id: 'id',
  processId: 'processId',
  type: 'type',
  value: 'value',
  active: 'active'
};

exports.Prisma.TrimFabricScalarFieldEnum = {
  id: 'id',
  name: 'name',
  active: 'active',
  companyId: 'companyId'
};

exports.Prisma.StateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  gstNo: 'gstNo',
  countryId: 'countryId',
  active: 'active'
};

exports.Prisma.CityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  stateId: 'stateId',
  active: 'active'
};

exports.Prisma.DepartmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  active: 'active',
  companyId: 'companyId'
};

exports.Prisma.PageGroupScalarFieldEnum = {
  id: 'id',
  type: 'type',
  name: 'name',
  active: 'active'
};

exports.Prisma.PartyCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.CurrencyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  currency: 'currency',
  code: 'code',
  icon: 'icon',
  companyId: 'companyId',
  active: 'active',
  subCurrency: 'subCurrency'
};

exports.Prisma.PartyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  aliasName: 'aliasName',
  displayName: 'displayName',
  address: 'address',
  cityId: 'cityId',
  pincode: 'pincode',
  panNo: 'panNo',
  tinNo: 'tinNo',
  cstNo: 'cstNo',
  cstDate: 'cstDate',
  cinNo: 'cinNo',
  faxNo: 'faxNo',
  email: 'email',
  website: 'website',
  contactPersonName: 'contactPersonName',
  gstNo: 'gstNo',
  currencyId: 'currencyId',
  costCode: 'costCode',
  active: 'active',
  contactMobile: 'contactMobile',
  yarn: 'yarn',
  fabric: 'fabric',
  accessoryGroup: 'accessoryGroup',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdById: 'createdById',
  updatedById: 'updatedById',
  priceTemplateId: 'priceTemplateId',
  companyId: 'companyId',
  branchId: 'branchId',
  payTermId: 'payTermId',
  incoTermId: 'incoTermId'
};

exports.Prisma.HsnScalarFieldEnum = {
  id: 'id',
  name: 'name',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.ColorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  pantone: 'pantone',
  companyId: 'companyId',
  active: 'active',
  isGrey: 'isGrey'
};

exports.Prisma.UnitOfMeasurementScalarFieldEnum = {
  id: 'id',
  name: 'name',
  companyId: 'companyId',
  active: 'active',
  isCutting: 'isCutting'
};

exports.Prisma.PayTermScalarFieldEnum = {
  id: 'id',
  name: 'name',
  days: 'days',
  companyId: 'companyId',
  active: 'active',
  financeCostPercent: 'financeCostPercent'
};

exports.Prisma.ProcessScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  io: 'io',
  isCutting: 'isCutting',
  isPacking: 'isPacking',
  isPcsStage: 'isPcsStage',
  isYarn: 'isYarn',
  isFabric: 'isFabric',
  isTrims: 'isTrims',
  isCmt: 'isCmt',
  isCommercial: 'isCommercial',
  isPrintingAndEmb: 'isPrintingAndEmb',
  isTransportation: 'isTransportation',
  isOversHeads: 'isOversHeads',
  isFinance: 'isFinance',
  isProcessLoss: 'isProcessLoss',
  isFinish: 'isFinish',
  isSpecialFinish: 'isSpecialFinish',
  isPurchase: 'isPurchase',
  isKnitting: 'isKnitting',
  isDyeing: 'isDyeing',
  isDefault: 'isDefault',
  active: 'active',
  companyId: 'companyId',
  rate: 'rate',
  loss: 'loss',
  isPrintingJobWork: 'isPrintingJobWork'
};

exports.Prisma.ProcessGroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  active: 'active',
  companyId: 'companyId'
};

exports.Prisma.ProcessGroupDetailsScalarFieldEnum = {
  id: 'id',
  processGroupId: 'processGroupId',
  processId: 'processId',
  sequence: 'sequence'
};

exports.Prisma.PartyOnProcessScalarFieldEnum = {
  id: 'id',
  partyId: 'partyId',
  processId: 'processId'
};

exports.Prisma.StyleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  sku: 'sku',
  productType: 'productType',
  seoTitle: 'seoTitle',
  image: 'image',
  sleeve: 'sleeve',
  pattern: 'pattern',
  occasion: 'occasion',
  material: 'material',
  washCare: 'washCare',
  active: 'active',
  companyId: 'companyId',
  hsn: 'hsn',
  sizeTemplateId: 'sizeTemplateId'
};

exports.Prisma.StyleOnColorScalarFieldEnum = {
  id: 'id',
  styleId: 'styleId',
  colorId: 'colorId'
};

exports.Prisma.PriceTemplateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.PriceTemplateStyleWiseDetailsScalarFieldEnum = {
  id: 'id',
  styleId: 'styleId',
  priceTemplateId: 'priceTemplateId'
};

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  isAccessory: 'isAccessory',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.SizeTemplateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  count: 'count',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.SizeTemplateOnSizeScalarFieldEnum = {
  id: 'id',
  sizeTemplateId: 'sizeTemplateId',
  sizeId: 'sizeId'
};

exports.Prisma.FieldMasterScalarFieldEnum = {
  id: 'id',
  name: 'name',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.ConsumptionTemplateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  branchId: 'branchId',
  active: 'active',
  formula: 'formula'
};

exports.Prisma.ConsumptionTemplateDetailsScalarFieldEnum = {
  id: 'id',
  fieldId: 'fieldId',
  formula: 'formula',
  consumptionTemplateId: 'consumptionTemplateId',
  sequence: 'sequence',
  defaultValue: 'defaultValue'
};

exports.Prisma.CostingScalarFieldEnum = {
  id: 'id',
  docId: 'docId',
  userDocDate: 'userDocDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdById: 'createdById',
  updatedById: 'updatedById',
  adminResavedId: 'adminResavedId',
  styleRefNo: 'styleRefNo',
  consumptionTemplateId: 'consumptionTemplateId',
  partyId: 'partyId',
  orderQty: 'orderQty',
  targetRate: 'targetRate',
  finalPrice: 'finalPrice',
  conversionValue: 'conversionValue',
  conversionValue1: 'conversionValue1',
  sizeTemplateId: 'sizeTemplateId',
  size: 'size',
  styleImage: 'styleImage',
  incoTermId: 'incoTermId',
  branchId: 'branchId',
  currencyId: 'currencyId',
  fabricDesc: 'fabricDesc',
  isApproved: 'isApproved',
  submitToApproval: 'submitToApproval',
  isOrderConfirmed: 'isOrderConfirmed',
  remarks: 'remarks',
  costingRemarks: 'costingRemarks',
  ratioId: 'ratioId',
  ratio: 'ratio',
  prevCostingId: 'prevCostingId',
  garmentLossPercent: 'garmentLossPercent',
  transportCostPercent: 'transportCostPercent',
  marginPercent: 'marginPercent',
  overHeadCost: 'overHeadCost',
  profitOrLoss: 'profitOrLoss'
};

exports.Prisma.CostingAttachmentsScalarFieldEnum = {
  id: 'id',
  costingId: 'costingId',
  name: 'name',
  filePath: 'filePath'
};

exports.Prisma.CommercialCostingDetailsScalarFieldEnum = {
  id: 'id',
  costingId: 'costingId',
  processId: 'processId',
  consumptionQty: 'consumptionQty',
  type: 'type',
  rate: 'rate'
};

exports.Prisma.CostingStyleItemDetailsScalarFieldEnum = {
  id: 'id',
  costingId: 'costingId',
  styleId: 'styleId',
  fabricId: 'fabricId',
  isTrimFabric: 'isTrimFabric',
  consumption: 'consumption',
  manualConsumption: 'manualConsumption',
  consumptionQty: 'consumptionQty',
  trimFabricId: 'trimFabricId',
  gsm: 'gsm',
  designId: 'designId',
  articleId: 'articleId',
  comboId: 'comboId',
  fabricDescription: 'fabricDescription',
  lengthOne: 'lengthOne',
  lengthTwo: 'lengthTwo',
  lengthThree: 'lengthThree',
  gradeOne: 'gradeOne',
  gradeTwo: 'gradeTwo',
  gradeThree: 'gradeThree'
};

exports.Prisma.ConsumptionDetailsTemplateDetailsScalarFieldEnum = {
  id: 'id',
  costingStyleItemDetailsId: 'costingStyleItemDetailsId',
  fieldId: 'fieldId',
  value: 'value'
};

exports.Prisma.YarnCostingDetailsScalarFieldEnum = {
  id: 'id',
  costingStyleItemDetailsId: 'costingStyleItemDetailsId',
  processId: 'processId',
  articleId: 'articleId',
  uomId: 'uomId',
  rate: 'rate',
  loss: 'loss',
  gain: 'gain'
};

exports.Prisma.FabricCostingDetailsScalarFieldEnum = {
  id: 'id',
  costingStyleItemDetailsId: 'costingStyleItemDetailsId',
  processId: 'processId',
  articleId: 'articleId',
  uomId: 'uomId',
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.AccessoryCostingDetailsScalarFieldEnum = {
  id: 'id',
  costingStyleItemDetailsId: 'costingStyleItemDetailsId',
  processId: 'processId',
  articleId: 'articleId',
  uomId: 'uomId',
  consumptionQty: 'consumptionQty',
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.CmtCostingDetailsScalarFieldEnum = {
  id: 'id',
  costingStyleItemDetailsId: 'costingStyleItemDetailsId',
  processId: 'processId',
  uomId: 'uomId',
  consumptionQty: 'consumptionQty',
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.StyleOnPortionScalarFieldEnum = {
  id: 'id',
  portionId: 'portionId',
  styleId: 'styleId'
};

exports.Prisma.FabricScalarFieldEnum = {
  id: 'id',
  name: 'name',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  costingId: 'costingId',
  senderId: 'senderId',
  receiverId: 'receiverId',
  type: 'type',
  message: 'message',
  isRead: 'isRead'
};

exports.Prisma.RatioScalarFieldEnum = {
  id: 'id',
  name: 'name',
  count: 'count',
  companyId: 'companyId',
  active: 'active'
};

exports.Prisma.StyleFabricTemplateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  styleId: 'styleId',
  fabricId: 'fabricId',
  yarnId: 'yarnId',
  isTrimFabric: 'isTrimFabric',
  branchId: 'branchId',
  designId: 'designId',
  finishId: 'finishId',
  specialFinishId: 'specialFinishId',
  gsm: 'gsm'
};

exports.Prisma.SFTYarnCostingDetailsScalarFieldEnum = {
  id: 'id',
  processId: 'processId',
  articleId: 'articleId',
  uomId: 'uomId',
  rate: 'rate',
  loss: 'loss',
  styleFabricTemplateId: 'styleFabricTemplateId'
};

exports.Prisma.SFTFabricCostingDetailsScalarFieldEnum = {
  id: 'id',
  processId: 'processId',
  articleId: 'articleId',
  uomId: 'uomId',
  rate: 'rate',
  loss: 'loss',
  styleFabricTemplateId: 'styleFabricTemplateId'
};

exports.Prisma.SFTAccessoryCostingDetailsScalarFieldEnum = {
  id: 'id',
  processId: 'processId',
  articleId: 'articleId',
  uomId: 'uomId',
  consumptionQty: 'consumptionQty',
  rate: 'rate',
  loss: 'loss',
  styleFabricTemplateId: 'styleFabricTemplateId'
};

exports.Prisma.SFTCmtCostingDetailsScalarFieldEnum = {
  id: 'id',
  processId: 'processId',
  uomId: 'uomId',
  consumptionQty: 'consumptionQty',
  rate: 'rate',
  loss: 'loss',
  styleFabricTemplateId: 'styleFabricTemplateId'
};

exports.Prisma.ArticleProcessPriceTemplateScalarFieldEnum = {
  id: 'id',
  processId: 'processId',
  articleId: 'articleId',
  rate: 'rate',
  loss: 'loss',
  effectiveDate: 'effectiveDate'
};

exports.Prisma.DesignScalarFieldEnum = {
  id: 'id',
  name: 'name',
  companyId: 'companyId',
  rate: 'rate',
  loss: 'loss',
  active: 'active'
};

exports.Prisma.ComboScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  active: 'active',
  companyId: 'companyId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  username: 'username',
  email: 'email',
  password: 'password',
  Idcard: 'Idcard',
  otp: 'otp',
  hod: 'hod',
  verificationOtp: 'verificationOtp',
  fcm: 'fcm'
};

exports.Prisma.CompanyCodeOrderByRelevanceFieldEnum = {
  Idcard: 'Idcard',
  companyCode: 'companyCode'
};

exports.Prisma.PermissionEntryOrderByRelevanceFieldEnum = {
  createdBy: 'createdBy',
  userId: 'userId',
  compCode: 'compCode',
  docid: 'docid',
  fTime: 'fTime',
  tTime: 'tTime',
  thrs: 'thrs',
  permissionId: 'permissionId',
  reason: 'reason',
  approvalStatus: 'approvalStatus',
  hod: 'hod'
};

exports.Prisma.PageOrderByRelevanceFieldEnum = {
  name: 'name',
  link: 'link'
};

exports.Prisma.InfoTermOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.ArticleOrderByRelevanceFieldEnum = {
  name: 'name',
  selectedType: 'selectedType'
};

exports.Prisma.CompanyOrderByRelevanceFieldEnum = {
  companyId: 'companyId',
  name: 'name',
  code: 'code',
  gstNo: 'gstNo',
  panNo: 'panNo',
  contactName: 'contactName',
  contactEmail: 'contactEmail',
  bankName: 'bankName',
  accNo: 'accNo',
  branchName: 'branchName',
  ifscCode: 'ifscCode'
};

exports.Prisma.SubscriptionOrderByRelevanceFieldEnum = {
  code: 'code'
};

exports.Prisma.PortionOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.BranchOrderByRelevanceFieldEnum = {
  branchName: 'branchName',
  branchCode: 'branchCode',
  contactName: 'contactName',
  contactEmail: 'contactEmail',
  idPrefix: 'idPrefix',
  idSequence: 'idSequence',
  tempPrefix: 'tempPrefix',
  tempSequence: 'tempSequence',
  address: 'address',
  gstNo: 'gstNo',
  panNo: 'panNo',
  logo: 'logo'
};

exports.Prisma.RoleOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.UserAdminDetOrderByRelevanceFieldEnum = {
  label: 'label'
};

exports.Prisma.EmployeeOrderByRelevanceFieldEnum = {
  name: 'name',
  email: 'email',
  regNo: 'regNo',
  chamberNo: 'chamberNo',
  fatherName: 'fatherName',
  panNo: 'panNo',
  consultFee: 'consultFee',
  salaryPerMonth: 'salaryPerMonth',
  commissionCharges: 'commissionCharges',
  accountNo: 'accountNo',
  ifscNo: 'ifscNo',
  branchName: 'branchName',
  degree: 'degree',
  specialization: 'specialization',
  localAddress: 'localAddress',
  permAddress: 'permAddress',
  leavingReason: 'leavingReason',
  rejoinReason: 'rejoinReason'
};

exports.Prisma.EmployeeCategoryOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code'
};

exports.Prisma.CountryOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code'
};

exports.Prisma.CommercialOrderByRelevanceFieldEnum = {
  type: 'type'
};

exports.Prisma.trimFabricOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.StateOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code',
  gstNo: 'gstNo'
};

exports.Prisma.CityOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code'
};

exports.Prisma.DepartmentOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code'
};

exports.Prisma.PageGroupOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.PartyCategoryOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code'
};

exports.Prisma.CurrencyOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code',
  icon: 'icon',
  subCurrency: 'subCurrency'
};

exports.Prisma.PartyOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code',
  aliasName: 'aliasName',
  displayName: 'displayName',
  address: 'address',
  panNo: 'panNo',
  tinNo: 'tinNo',
  cstNo: 'cstNo',
  cinNo: 'cinNo',
  faxNo: 'faxNo',
  email: 'email',
  website: 'website',
  contactPersonName: 'contactPersonName',
  gstNo: 'gstNo',
  costCode: 'costCode'
};

exports.Prisma.HsnOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.ColorOrderByRelevanceFieldEnum = {
  name: 'name',
  pantone: 'pantone'
};

exports.Prisma.UnitOfMeasurementOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.PayTermOrderByRelevanceFieldEnum = {
  name: 'name',
  financeCostPercent: 'financeCostPercent'
};

exports.Prisma.ProcessOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code'
};

exports.Prisma.ProcessGroupOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.ProcessGroupDetailsOrderByRelevanceFieldEnum = {
  sequence: 'sequence'
};

exports.Prisma.StyleOrderByRelevanceFieldEnum = {
  name: 'name',
  sku: 'sku',
  productType: 'productType',
  seoTitle: 'seoTitle',
  sleeve: 'sleeve',
  pattern: 'pattern',
  occasion: 'occasion',
  material: 'material',
  washCare: 'washCare',
  hsn: 'hsn'
};

exports.Prisma.PriceTemplateOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.SizeOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.SizeTemplateOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.FieldMasterOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.ConsumptionTemplateOrderByRelevanceFieldEnum = {
  name: 'name',
  formula: 'formula'
};

exports.Prisma.ConsumptionTemplateDetailsOrderByRelevanceFieldEnum = {
  formula: 'formula',
  defaultValue: 'defaultValue'
};

exports.Prisma.CostingOrderByRelevanceFieldEnum = {
  docId: 'docId',
  styleRefNo: 'styleRefNo',
  orderQty: 'orderQty',
  targetRate: 'targetRate',
  finalPrice: 'finalPrice',
  conversionValue: 'conversionValue',
  conversionValue1: 'conversionValue1',
  size: 'size',
  styleImage: 'styleImage',
  fabricDesc: 'fabricDesc',
  remarks: 'remarks',
  costingRemarks: 'costingRemarks',
  ratio: 'ratio',
  garmentLossPercent: 'garmentLossPercent',
  transportCostPercent: 'transportCostPercent',
  marginPercent: 'marginPercent',
  overHeadCost: 'overHeadCost',
  profitOrLoss: 'profitOrLoss'
};

exports.Prisma.CostingAttachmentsOrderByRelevanceFieldEnum = {
  name: 'name',
  filePath: 'filePath'
};

exports.Prisma.CommercialCostingDetailsOrderByRelevanceFieldEnum = {
  consumptionQty: 'consumptionQty',
  type: 'type',
  rate: 'rate'
};

exports.Prisma.CostingStyleItemDetailsOrderByRelevanceFieldEnum = {
  consumption: 'consumption',
  manualConsumption: 'manualConsumption',
  consumptionQty: 'consumptionQty',
  fabricDescription: 'fabricDescription'
};

exports.Prisma.ConsumptionDetailsTemplateDetailsOrderByRelevanceFieldEnum = {
  value: 'value'
};

exports.Prisma.YarnCostingDetailsOrderByRelevanceFieldEnum = {
  rate: 'rate',
  loss: 'loss',
  gain: 'gain'
};

exports.Prisma.FabricCostingDetailsOrderByRelevanceFieldEnum = {
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.AccessoryCostingDetailsOrderByRelevanceFieldEnum = {
  consumptionQty: 'consumptionQty',
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.CmtCostingDetailsOrderByRelevanceFieldEnum = {
  consumptionQty: 'consumptionQty',
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.FabricOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.NotificationOrderByRelevanceFieldEnum = {
  type: 'type',
  message: 'message'
};

exports.Prisma.RatioOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.StyleFabricTemplateOrderByRelevanceFieldEnum = {
  name: 'name',
  gsm: 'gsm'
};

exports.Prisma.SFTYarnCostingDetailsOrderByRelevanceFieldEnum = {
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.SFTFabricCostingDetailsOrderByRelevanceFieldEnum = {
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.SFTAccessoryCostingDetailsOrderByRelevanceFieldEnum = {
  consumptionQty: 'consumptionQty',
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.SFTCmtCostingDetailsOrderByRelevanceFieldEnum = {
  consumptionQty: 'consumptionQty',
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.ArticleProcessPriceTemplateOrderByRelevanceFieldEnum = {
  rate: 'rate',
  loss: 'loss'
};

exports.Prisma.DesignOrderByRelevanceFieldEnum = {
  name: 'name'
};

exports.Prisma.ComboOrderByRelevanceFieldEnum = {
  name: 'name',
  code: 'code'
};
exports.PageType = exports.$Enums.PageType = {
  Masters: 'Masters',
  Transactions: 'Transactions',
  Reports: 'Reports',
  AdminAccess: 'AdminAccess'
};

exports.PrefixCategory = exports.$Enums.PrefixCategory = {
  Default: 'Default',
  Specific: 'Specific'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.MaritalStatus = exports.$Enums.MaritalStatus = {
  SINGLE: 'SINGLE',
  MARRIED: 'MARRIED',
  SEPARATED: 'SEPARATED'
};

exports.BloodGroup = exports.$Enums.BloodGroup = {
  AP: 'AP',
  BP: 'BP',
  AN: 'AN',
  BN: 'BN',
  ABP: 'ABP',
  ABN: 'ABN',
  OP: 'OP',
  ON: 'ON'
};

exports.ProcessIO = exports.$Enums.ProcessIO = {
  GY_GY: 'GY_GY',
  GY_DY: 'GY_DY',
  GY_GF: 'GY_GF',
  DY_DY: 'DY_DY',
  DY_DF: 'DY_DF',
  GF_DF: 'GF_DF',
  DF_DF: 'DF_DF'
};

exports.Prisma.ModelName = {
  User: 'User',
  CompanyCode: 'CompanyCode',
  PermissionDocID: 'PermissionDocID',
  PermissionEntry: 'PermissionEntry',
  Page: 'Page',
  InfoTerm: 'InfoTerm',
  Article: 'Article',
  Company: 'Company',
  Subscription: 'Subscription',
  Portion: 'Portion',
  Branch: 'Branch',
  UserOnBranch: 'UserOnBranch',
  Role: 'Role',
  RoleOnPage: 'RoleOnPage',
  UserAdminDet: 'UserAdminDet',
  UserPartyDetails: 'UserPartyDetails',
  Employee: 'Employee',
  FinYear: 'FinYear',
  EmployeeCategory: 'EmployeeCategory',
  Country: 'Country',
  Commercial: 'Commercial',
  trimFabric: 'trimFabric',
  State: 'State',
  City: 'City',
  Department: 'Department',
  PageGroup: 'PageGroup',
  PartyCategory: 'PartyCategory',
  Currency: 'Currency',
  Party: 'Party',
  Hsn: 'Hsn',
  Color: 'Color',
  UnitOfMeasurement: 'UnitOfMeasurement',
  PayTerm: 'PayTerm',
  Process: 'Process',
  ProcessGroup: 'ProcessGroup',
  ProcessGroupDetails: 'ProcessGroupDetails',
  PartyOnProcess: 'PartyOnProcess',
  Style: 'Style',
  StyleOnColor: 'StyleOnColor',
  PriceTemplate: 'PriceTemplate',
  PriceTemplateStyleWiseDetails: 'PriceTemplateStyleWiseDetails',
  Size: 'Size',
  SizeTemplate: 'SizeTemplate',
  SizeTemplateOnSize: 'SizeTemplateOnSize',
  FieldMaster: 'FieldMaster',
  ConsumptionTemplate: 'ConsumptionTemplate',
  ConsumptionTemplateDetails: 'ConsumptionTemplateDetails',
  Costing: 'Costing',
  CostingAttachments: 'CostingAttachments',
  CommercialCostingDetails: 'CommercialCostingDetails',
  CostingStyleItemDetails: 'CostingStyleItemDetails',
  ConsumptionDetailsTemplateDetails: 'ConsumptionDetailsTemplateDetails',
  YarnCostingDetails: 'YarnCostingDetails',
  FabricCostingDetails: 'FabricCostingDetails',
  AccessoryCostingDetails: 'AccessoryCostingDetails',
  CmtCostingDetails: 'CmtCostingDetails',
  StyleOnPortion: 'StyleOnPortion',
  Fabric: 'Fabric',
  Notification: 'Notification',
  Ratio: 'Ratio',
  StyleFabricTemplate: 'StyleFabricTemplate',
  SFTYarnCostingDetails: 'SFTYarnCostingDetails',
  SFTFabricCostingDetails: 'SFTFabricCostingDetails',
  SFTAccessoryCostingDetails: 'SFTAccessoryCostingDetails',
  SFTCmtCostingDetails: 'SFTCmtCostingDetails',
  ArticleProcessPriceTemplate: 'ArticleProcessPriceTemplate',
  Design: 'Design',
  Combo: 'Combo'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
