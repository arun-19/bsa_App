const { useFonts } = require('expo-font');

export const useCustomFonts=()=>{
    const [fontsLoaded] = useFonts({
        'Tektur-Regular': require('../../assets/fonts/Tektur-Regular.ttf'),
        'Tektur-Bold': require('../../assets/fonts/Tektur-Bold.ttf'),
        "Dosis-Regular":require("../../assets/fonts/Delius-Regular.ttf"),
        "Dosis-Bold":require("../../assets/fonts/OpenSans_Condensed-Bold.ttf"),
        "CormorantGaramond-Italic":require("../../assets/fonts/CormorantGaramond-Italic.ttf"),
      });


      return {fontsLoaded}
}