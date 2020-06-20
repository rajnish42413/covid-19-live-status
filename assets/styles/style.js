import {StyleSheet,Dimensions} from 'react-native';
import colors from '../../constants/Colors';
const win = Dimensions.get('window');
const ratio = win.width/541;
export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.bg
    },
    row:{
      padding:10,
      backgroundColor: colors.white,
      marginBottom:5
    },
    inline:{
      display:'flex',flexDirection:'row', flexWrap:'wrap',marginBottom:10
    },
    card: {
      backgroundColor: colors.white,
      borderWidth: 0,
      borderRadius: 3,
      marginBottom:10
    },
    col:{
      display:'flex',
      flexDirection:'row', flexWrap:'wrap',
    },
    textBold:{
      fontWeight:"bold",
      fontSize:18,
      paddingVertical:8
    },
    imageStyle: {
      width: win.width-10,
      },
      textSmall:{
        fontSize:10,
      },
      textMuted:{
        color: colors.muted
      },
      textRight:{
        textAlign: "right"
      },
      item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
    },  
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
    },
  });