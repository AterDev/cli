/**
 * 客户跟进状态
 */
export enum FollowUpStatus {
  PendingTrial = 0,
  FirstFollowUpAfterTrial = 1,
  SecondFollowUpAfterTrial = 2,
  ThirdFollowUpAfterTrial = 3,
  HighProbabilityOfEnrollment = 4,
  InterestedButConsideringLater = 5,
  Renewal = 6,

}
