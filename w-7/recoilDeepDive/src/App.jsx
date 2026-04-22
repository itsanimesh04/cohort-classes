import { RecoilRoot, useRecoilValue } from "recoil";
import {
  jobsAtom,
  messagingAtom,
  networkAtom,
  notificationsAtom,
  totalCountSelector,
} from "./atoms";
import { useMemo } from "react";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const networkCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const messagingCount = useRecoilValue(messagingAtom);
  const notificationsCount = useRecoilValue(notificationsAtom);

  // const totalCount = useMemo(() => {
  //   return networkCount + jobsCount + messagingCount + notificationsCount;
  // },[networkCount, jobsCount, messagingCount, notificationsCount])

  const totalCount = useRecoilValue(totalCountSelector);

  return (
    <>
      <button>Home</button>

      <button>my network ({networkCount >= 100 ? "99+" : networkCount})</button>
      <button>jobs ({jobsCount}) </button>
      <button>messaging ({messagingCount}) </button>
      <button>notifications ({notificationsCount}) </button>

      <button>me {totalCount} </button>
    </>
  );
}

export default App;
