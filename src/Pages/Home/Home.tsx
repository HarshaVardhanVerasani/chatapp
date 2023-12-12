import { useMediaQuery, useTheme } from '@mui/material';
import DesktopViewPage from '../DesktopViewPage/DesktopViewPage';
import MobileViewPage from '../MobileViewPage/MobileViewPage';

const Home = () => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {isMobileView ? <MobileViewPage /> : < DesktopViewPage />}
    </>
  )
}

export default Home;
