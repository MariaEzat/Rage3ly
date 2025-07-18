export enum FeatureEnum {
  // Brand Features
  CreateBrand = 1,
  DeleteBrand = 2,
  EditBrand = 3,
  GetBrandByName = 4,
  GetBrandlist = 5,
  ActiveBrand = 6,
  DeactiveBrand = 7,
  BulkDeleteBrand = 8,
  BulkActivateBrand = 9,
  BulkDeActivateBrand = 10,
  GetBrandsNames = 11,
  GetProductsByBrandId = 12,
  GetBrandByID = 13,
  GetAllBrand = 14,
  SelectBrandList = 15,
  // City Features
  CreateCity = 1000,
  DeleteCity = 1001,
  EditCity = 1002,
  GetCityList = 1003,
  FilterCity = 1004,
  ActiveCity = 1005,
  DeactiveCity = 1006,
  AddRangeCities = 1007,
  BulkDeleteCity = 1008,
  BulkDeactivateCity = 1009,
  BulkActivateCity = 1010,
  GetCitiesbyGovernorateID = 1011,
  GetCitybyID = 1012,
  SelectCityList = 1013,

  // Governorate Features
  CreateGovernorate = 2000,
  DeleteGovernorate = 2001,
  EditGovernorate = 2002,
  GetGovernorateList = 2003,
  GetGovernorateByName = 2004,
  ActiveGovernorate = 2005,
  DeactiveGovernorate = 2006,
  AddRangeGovernrates = 2007,
  BulkDeleteGovernorate = 2008,
  BulkActivateGovernorate = 2009,
  BulkDeactivateGovernorate = 2010,
  GetAllGovernorateWithAllCities = 2011,
  GetGovernorateDropdownList = 2012,
  GetGovernoratebyID = 2013,
  InitiatGovernratesAndCities = 2014,
  // Role Features
  CreateRole = 3000,
  DeleteRole = 3001,
  EditRole = 3002,
  GetRoleList = 3003,
  ActivateRole = 3004,
  DeactivateRole = 3005,
  AssignFeaturesToRole = 3006,
  AssignBulkFeaturesToRole = 3007,
  AssignFeaturesToModule = 3008,
  AssignModulesToRole = 3009,
  UnassignFeaturesfromRole = 3010,
  UnassignFeaturesfromModule = 3011,
  UnassignBulkFeaturesToRole = 3012,
  SearchRoleByName = 3013,

  // Client Features
  ClientRegister = 4000,
  CreateClient = 4001,
  EditClient = 4002,
  DeleteClient = 4003,
  GetClientList = 4004,
  SearchClient = 4005,
  ActivateClients = 4006,
  BulkDeActivateUser = 4007,
  DeactivateClients = 4008,
  BulkActivateClients = 4009,
  BulkDeactivateClients = 4010,
  GetClientById = 4011,
  GetClientByMobile = 4012,
  VerifiedTempClient = 4013,
  AddTempClient = 4014,
  RejectTempClient = 4015,
  VerifiedUser = 4016,
  ClientSelectList = 4017,
  //ResetPasswordOTP,
  //ResetPassword,
  ChangePassword = 4018,
  //Login,
  //OTPLogin,
  //VerifyOTP,
  //ResendOTP,
  RecoverAccount = 4019,
  GetIDOfDefualtShippingAddress = 4020,
  ExportClientsToExcel = 4021,
  UserData = 4022,
  BulkActivateUser = 4023,
  SendEmailToClients = 4024,
  GetClientsWithDefualtShippingAddress = 4025,
  GetAllPendingClient = 4026,
  GetAllNotPendingClient = 4027,
  GetTempClientByID = 4028,
  RejectUser = 4029,
  GetAllVerifiedOrRejectUser = 4030,
  GetUserById = 4031,
  GetClientDetails = 4032,
  GetClientWithPhoneDetails = 4033,
  MostUsedGovernorates = 4034,
  MostUsedGovernoratesRatio = 4035,
  AddClientImage = 4036,
  // Advertisement Features
  CreateAdvertisement = 5000,
  EditAdvertisement = 5001,
  DeleteAdvertisement = 5002,
  GetAdvertisementByID = 5003,
  ActiveAdvertisement = 5004,
  GetAllAdvertisement = 5005,
  BulkActivateAdvertisement = 5006,
  BulkDeactivateAdvertisement = 5007,
  BulkDeleteAdvertisement = 5008,
  DeactivateAdvertisement = 5009,
  GetAllAdvertisementForAdmin = 5010,
  // Media Features
  //UploadMedia ,
  DeleteMedia = 6000,
  DeleteBulkMediaBySourceId = 6001,
  //SaveMedia,

  // Phone Features
  AddPhone = 7000,
  SearchPhone = 7001,
  DeletePhone = 7002,
  BulkDeletePhones = 7003,
  EditPhone = 7004,
  GetPhoneByID = 7005,
  GetClientPhones = 7006,
  GetPhonesByAdmin = 7007,
  PhoneSafe = 7008,
  PhoneBrandRatio = 7009,
  GetAllReturnedPhones = 7010,
  GovernoratePhoneRatio = 7011,
  GetStolenPhoneRatio = 7012,

  // General Featueres
  GetFeaturesbyRoleID = 8000,
  GetFeaturesbyModuleID = 8001,
  GetFeatueresListed = 8002,
  GetModulesbyRoleID = 8003,
  //AssignAllFeaturesToRole,
  GetVerifyStatusList = 8004,
  GetAllVerifiedStatus = 8005,
  CreatePage = 8006,
  CreateModule = 8007,
  CreateUser = 8008,
  EditUser = 8009,
  FilterUsers = 8010,
  ChangeUserPassword = 8011,
  ActivateUser = 8012,
  DeactivateUser = 8013,
  //CheckOTPValidation
  DashboardStatistics = 8014,

  //MobileStatusChangeRequest
  AddMobileStatusChangeRequest = 9000,
  GetAllMobileRequests = 9001,
  RejectMobileStatusChangeRequests = 9002,
  GetMobileStatusChangeRequestsById = 9003,
  ApproveMobileStatusChangeRequests = 9004,
  EditImageRequestStatus = 9005,
  GetAllMobileRequestsByClientId = 9006,
  EditMobileStatusChangeRequestImage = 9007,
  StolenPhonesByGovernorate = 9008,
  StolenPhonesByCities = 9009,
  CancelMobileStatusChangeRequests = 9010,
  //transfer ownership request
  GetTransferOwnershipRequestByID = 10000,
  AcceptTransferOwnershipRequest = 10001,
  CreateTransferOwnershipRequest = 10002,
  RejectTransferOwnershipRequest = 10003,
  GetAllTransferOwnershipRequests = 10004,
  EditImageStatusTransferOwnershipRequest = 10005,
  GetOwnerShipRequestByClientId = 10006,
  CancelTransferOwnershipRequest = 10007,
  EditTransferOwnershipRequestImage = 10008,
  //ActionLog
  GetAllActionLog = 11000,
  FilterActionLogByStolenStatus = 11001,
  GetMostSearchClients = 11002,

  //Notification
  GetAllNotificationMessages = 12000,
  GetAllNotificationMessagesForClient = 12001,
  SendNotification = 12002,

  //Emails
  GetAllEmails = 13000,
}
