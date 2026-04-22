import { atom } from "recoil";
import { selector } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: 102,
});

export const jobsAtom = atom({
  key: "jobsAtom",
  default: 45,
});

export const messagingAtom = atom({
  key: "messagingAtom",
  default: 0,
});

export const notificationsAtom = atom({
  key: "notificationsAtom",
  default: 56,
});

export const totalCountSelector = selector({
  key: "totalCountSelector",
  get: ({ get }) => {
    const networkCount = get(networkAtom);
    const jobsCount = get(jobsAtom);
    const messagingCount = get(messagingAtom);
    const notificationsCount = get(notificationsAtom);
    return networkCount + jobsCount + messagingCount + notificationsCount;
  },
});
