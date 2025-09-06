export enum FeatureEnum {
  // Brand Features
  CreateBrand = 1,
  DeleteBrand = 2,
  EditBrand = 3,
  GetBrandlist = 4,
  BulkDeleteBrand = 5,
  GetBrandByID = 6,

  // City Features
  CreateCity = 1000,
  DeleteCity = 1001,
  EditCity = 1002,
  FilterCity = 1003,
  ActiveCity = 1005,
  DeactiveCity = 1006,
  BulkDeleteCity = 1007,
  BulkDeactivateCity = 1008,
  BulkActivateCity = 1009,
  GetCitybyID = 1010,

  // Governorate Features
  CreateGovernorate = 2000,
  DeleteGovernorate = 2001,
  EditGovernorate = 2002,
  ActiveGovernorate = 2003,
  DeactiveGovernorate = 2004,
  BulkDeleteGovernorate = 2005,
  BulkActivateGovernorate = 2006,
  BulkDeactivateGovernorate = 2007,
  GetAllGovernorateWithAllCities = 2008,
  GetGovernoratebyID = 2009,
  InitiatGovernratesAndCities = 2010,

  // Role Features
  AssignFeaturesToRole = 3000,
  UnassignFeaturesfromRole = 3001,
  UnassignBulkFeaturesToRole = 3002,
  AssignBulkFeaturesToRole = 3003,


  // Client Features
  CreateClient = 4000,
  SearchClient = 4001,
  ActivateClients = 4002,
  BulkDeActivateUser = 4003,
  DeactivateClients = 4004,
  BulkActivateClients = 4005,
  BulkDeactivateClients = 4006,
  ClientSelectList = 4007,
  ExportClientsToExcel = 4008,
  BulkActivateUser = 4009,
  GetClientWithPhoneDetails = 4010,
  MostUsedGovernorates = 4011,
  MostUsedGovernoratesRatio = 4012,
  GetClientById = 4013,
  GetUserById = 4014,


  // Advertisement Features
  CreateAdvertisement = 5000,
  EditAdvertisement = 5001,
  DeleteAdvertisement = 5002,
  GetAdvertisementByID = 5003,
  ActiveAdvertisement = 5004,
  BulkActivateAdvertisement = 5005,
  BulkDeactivateAdvertisement = 5006,
  BulkDeleteAdvertisement = 5007,
  DeactivateAdvertisement = 5008,
  GetAllAdvertisementForAdmin = 5009,

  // Phone Features
  BulkDeletePhones = 6000,
  GetPhonesByAdmin = 6001,
  PhoneBrandRatio = 6002,
  GetAllReturnedPhones = 6003,
  GovernoratePhoneRatio = 6004,
  GetStolenPhoneRatio = 6005,

  // General Featueres
  GetFeaturesbyRoleID = 7000,
  GetFeatueresListed = 7001,
  GetModulesbyRoleID = 7002,
  GetVerifyStatusList = 7003,
  CreateUser = 7004,
  EditUser = 7005,
  FilterUsers = 7006,
  ChangePassword = 7007,
  DeactivateUser = 7008,
  ActivateUser = 7009,

  //CheckOTPValidation
  DashboardStatistics = 7010,
  UserData = 7011,
  ReturnedPhonesAndClients = 7012,


  //MobileStatusChangeRequest
  GetAllMobileRequests = 8000,
  RejectMobileStatusChangeRequests = 8001,
  ApproveMobileStatusChangeRequests = 8002,
  EditImageRequestStatus = 8003,
  StolenPhonesByGovernorate = 8004,
  StolenPhonesByCities = 8005,



  //transfer ownership request
  AcceptTransferOwnershipRequest = 9000,
  RejectTransferOwnershipRequest = 9001,
  GetAllTransferOwnershipRequests = 9002,
  EditImageStatusTransferOwnershipRequest = 9003,

  //ActionLog
  GetAllActionLog = 10000,
  FilterActionLogByStolenStatus = 10001,
  GetMostSearchClients = 10002,

  //Notification
  GetAllNotificationMessages = 11000,
  SendNotification = 11001,

  //Emails
  GetAllEmails = 12000,
  SendEmailToClients = 12001,



  //Client Role Features 

  //1- brand
  SelectBrandList = 13000,

  //2- Client
  EditClient = 14000,
  ChangeUserPassword = 14001,
  AddClientImage = 14002,
  GetClientDetails = 14003,
  DeleteClient = 14004,
  //3- Advertisement
  GetAllAdvertisement = 15000,

  //4-  Phone
  AddPhone = 16000,
  SearchPhone = 16001,
  DeletePhone = 16002,
  EditPhone = 16003,
  GetPhoneByID = 16004,
  GetClientPhones = 16005,
  PhoneSafe = 16006,

  //5- MobileStatusChangeRequest
  AddMobileStatusChangeRequest = 17000,
  EditMobileStatusChangeRequestImage = 17001,
  GetAllMobileRequestsByClientId = 17002,
  CancelMobileStatusChangeRequests = 17003,

  //6-TransferOwnershipRequest,
  CreateTransferOwnershipRequest = 18000,
  EditTransferOwnershipRequestImage = 18001,
  GetOwnerShipRequestByClientId = 18002,
  CancelTransferOwnershipRequest = 18003,

  //7-NotificationNotification
  GetAllNotificationMessagesForClient = 19000


}
