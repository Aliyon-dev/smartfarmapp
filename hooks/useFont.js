import * as Font from 'expo-font'
import {useEffect, useState} from  'react' 
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,

} from  '@expo-google-fonts/open-sans'

import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,

} from '@expo-google-fonts/montserrat'


export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          OpenSansLight: OpenSans_300Light,
          OpenSansRegular: OpenSans_400Regular,
          OpenSansSemiBold: OpenSans_600SemiBold,
          OpenSansBold: OpenSans_700Bold,
          MontserratLight: Montserrat_300Light,
          MontserratRegular: Montserrat_400Regular,
          MontserratMedium: Montserrat_500Medium,
          MontserratSemiBold: Montserrat_600SemiBold,
          MontserratBold: Montserrat_700Bold,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn(error);
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}