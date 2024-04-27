import mixpanel from "mixpanel-browser";
mixpanel.init("7f3a64f6fe300421f8fc4549b078668f", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

// mixpanel.identify("USER_ID");

// // Track an event. It can be anything, but in this example, we're tracking a Sign Up event.
// mixpanel.track("Sign Up", {
//   "Signup Type": "Referral",
// });

export const analyticsUtilBrowser = mixpanel;
