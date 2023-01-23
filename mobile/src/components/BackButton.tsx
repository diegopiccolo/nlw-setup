import { TouchableOpacity, Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import {useNavigation} from '@react-navigation/native';



export function BackButton() {
  const {goBack} = useNavigation();
  return (
    <TouchableOpacity
      // className="bg-zinc-900 rounded-lg m-1 border-2 border-zinc-800"
      // style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      onPress={goBack}>
      <Feather
        name="arrow-left"
        size={32}
        color={colors.zinc[400]} />
    </TouchableOpacity>
  )
}