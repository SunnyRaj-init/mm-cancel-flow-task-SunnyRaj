const routes = {
  cancelSub: "/subscription-cancellation",
  home: "/",
  foundJobStep1: "/subscription-cancellation/found-a-job-step-1",
  foundJobStep2:
    "/subscription-cancellation/found-a-job-step-1/found-a-job-step-2",
  withMMStep3:
    "/subscription-cancellation/found-a-job-step-1/found-a-job-step-2/with-mm-step-3",
  withoutMMStep3:
    "/subscription-cancellation/found-a-job-step-1/found-a-job-step-2/without-mm-step-3",
  noVisaHelp: "/subscription-cancellation/no-visa-help",
  visaHelp: "/subscription-cancellation/visa-help",
  downServe: "/subscription-cancellation/down-serve",
  offerAccepted: "/subscription-cancellation/down-serve/offer-accepted",
  offerAcceptedAlt: "/subscription-cancellation/down-serve/offer-accepted-alt",
  offerDeclined: "/subscription-cancellation/down-serve/offer-declined",
  mainReason:
    "/subscription-cancellation/down-serve/offer-declined/main-reason",
  cancelCompleted:
    "/subscription-cancellation/down-serve/offer-declined/main-reason/cancel-completed",
};
export default routes;
