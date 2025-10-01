import {useState, useEffect} from 'react'
import { Outlet, useMatches } from 'react-router';
import ToggleBar from '@components/toggleBar/ToggleBar';
import MainBackground from '@ui/MainBackground/MainBackground';

export default function RootLayout() {
  const [curPage, setCurPage] = useState<number>(0);
  const matches = useMatches() as Array<{ handle?: { pageId?: number } }>;
  const activeIndex =
    matches
      .map((m) => m?.handle?.pageId)
      .filter((n) => n !== undefined)
      .pop() ?? 0;
  useEffect(() => {
    setCurPage(activeIndex);
  }, [activeIndex]);
  return (
    <MainBackground>
      <ToggleBar pageId={curPage} />
      <Outlet context={activeIndex} />
    </MainBackground>
  );
}
