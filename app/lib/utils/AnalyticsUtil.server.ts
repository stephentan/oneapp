import Mixpanel from "mixpanel";

const mixPanel = Mixpanel.init("7f3a64f6fe300421f8fc4549b078668f");

const env_check = true; //process.env.NODE_ENV === "production";

export const analyticsUtil = {
  identify: (id: string) => {
    mixPanel.identify(id);
  },
  alias: (id: string) => {
    if (env_check) mixPanel.alias(id);
  },
  track: (name: string, props?: undefined) => {
    mixPanel.track(name, props);
  },
  people: {
    set: (props: undefined) => {
      if (env_check) mixPanel.people.set(props);
    },
  },
};
