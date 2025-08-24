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
  GetBrandByID = 12,
  GetAllBrand = 13,
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
  GetCitybyID = 1011,
  GetCitiesbyGovernorateID = 1012,
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
  GetGovernoratebyID = 2012,
  InitiatGovernratesAndCities = 2014,
  GetGovernorateDropdownList = 2015,

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
  GetClientList = 4002,
  SearchClient = 4003,
  ActivateClients = 4004,
  BulkDeActivateUser = 4005,
  DeactivateClients = 4006,
  BulkActivateClients = 4007,
  BulkDeactivateClients = 4008,
  GetClientByMobile = 4009,
  VerifiedUser = 4010,
  ClientSelectList = 4011,
  ExportClientsToExcel = 4012,
  BulkActivateUser = 4013,
  GetClientsWithDefualtShippingAddress = 4014,
  GetAllPendingClient = 4015,
  GetAllNotPendingClient = 4016,
  GetTempClientByID = 4017,
  RejectUser = 4018,
  GetAllVerifiedOrRejectUser = 4019,
  GetClientWithPhoneDetails = 4020,
  MostUsedGovernorates = 4021,
  MostUsedGovernoratesRatio = 4022,
  DeleteClient = 4023,
  GetClientById = 4024,
  RecoverAccount = 4025,
  GetUserById = 4026,

  // Advertisement Features
  CreateAdvertisement = 5000,
  EditAdvertisement = 5001,
  DeleteAdvertisement = 5002,
  GetAdvertisementByID = 5003,
  ActiveAdvertisement = 5004,
  // GetAllAdvertisement = 5005,
  BulkActivateAdvertisement = 5005,
  BulkDeactivateAdvertisement = 5006,
  BulkDeleteAdvertisement = 5007,
  DeactivateAdvertisement = 5008,
  GetAllAdvertisementForAdmin = 5009,
  // Media Features
  //UploadMedia ,
  DeleteMedia = 6000,
  DeleteBulkMediaBySourceId = 6001,
  //SaveMedia,

  // Phone Features
  BulkDeletePhones = 7000,
  GetPhonesByAdmin = 7001,
  PhoneBrandRatio = 7002,
  GetAllReturnedPhones = 7003,
  GovernoratePhoneRatio = 7004,
  GetStolenPhoneRatio = 7005,

  // General Featueres
  GetFeaturesbyRoleID = 8000,
  GetFeatueresListed = 8001,
  GetModulesbyRoleID = 8002,
  //AssignAllFeaturesToRole,
  GetVerifyStatusList = 8003,
  GetAllVerifiedStatus = 8004,
  CreateUser = 8005,
  EditUser = 8006,
  FilterUsers = 8007,
  ChangePassword = 8008,
  ActivateUser = 8009,
  DeactivateUser = 8010,
  //CheckOTPValidation
  DashboardStatistics = 8011,
  UserData = 8012,


  //MobileStatusChangeRequest
  GetAllMobileRequests = 9000,
  RejectMobileStatusChangeRequests = 9001,
  GetMobileStatusChangeRequestsById = 9002,
  ApproveMobileStatusChangeRequests = 9003,
  EditImageRequestStatus = 9004,
  StolenPhonesByGovernorate = 9005,
  StolenPhonesByCities = 9006,



  //transfer ownership request
  GetTransferOwnershipRequestByID = 10000,
  AcceptTransferOwnershipRequest = 10001,
  RejectTransferOwnershipRequest = 10002,
  GetAllTransferOwnershipRequests = 10003,
  EditImageStatusTransferOwnershipRequest = 10004,
 
  //ActionLog
  GetAllActionLog = 11000,
  FilterActionLogByStolenStatus = 11001,
  GetMostSearchClients = 11002,

  //Notification
  GetAllNotificationMessages = 12000,
  SendNotification = 12001,

  //Emails
  GetAllEmails = 13000,
  SendEmailToClients = 13001,



  //Client Role Features 

    //1- brand
    SelectBrandList=14000,

    //2- Client
    EditClient=15000,
    ChangeUserPassword=15001,
    AddClientImage=15002,
    GetClientDetails=15003,

    //3- Advertisement
    GetAllAdvertisement=16000,

    //4-  Phone
    AddPhone = 17000,
    SearchPhone=17001,
    DeletePhone=17002,
    EditPhone=17003,
    GetPhoneByID=17004,
    GetClientPhones=17005,
    PhoneSafe=17006,

    //5- MobileStatusChangeRequest
    AddMobileStatusChangeRequest=18000,
    EditMobileStatusChangeRequestImage=18001,
    GetAllMobileRequestsByClientId=18002,
    CancelMobileStatusChangeRequests=18003,

    //6-TransferOwnershipRequest,
    CreateTransferOwnershipRequest = 19000,
    EditTransferOwnershipRequestImage=19001,
    GetOwnerShipRequestByClientId=19002,
    CancelTransferOwnershipRequest=19003,

    //7-NotificationNotification
    GetAllNotificationMessagesForClient = 20000


}
