const apiRoutes = {
  home: "/api",
  foundAJobStep1: "/api/subscription-cancellation/found-a-job-step-1",
  foundAJobStep2: "/api/subscription-cancellation/found-a-job-step-2",
  foundAJobStep3: "/api/subscription-cancellation/found-a-job-step-3",
  resetToStep1: "/api/subscription-cancellation/reset-to-step-1",
  cancelComplete:'/api/subscription-cancellation/complete',
  saveVariant:'/api/subscription-cancellation/save-variant',
  OfferAccepted:'/api/subscription-cancellation/down-serve/offer-accepted',
  keepSubscription:'/api/keep-subscription',
  offerDeclined:'/api/offer-declined',
  mainReason:'/api/offer-declined/main-reason'
};

export default apiRoutes;
