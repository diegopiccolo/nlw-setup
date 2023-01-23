import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native';
import Animated, { ZoomIn, ZoomOut}  from "react-native-reanimated";

import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";

interface Props  extends TouchableOpacityProps{
  title: string;
  checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className="flex-row mb-2 items-center">
      {
        checked
          ?
          <Animated.View
            className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'
            entering={ZoomIn}
            exiting={ZoomOut}>
            <Feather
              name="check"
              size={20}
              color={colors.white} />
          </Animated.View>
          :
          <View className='h-8 w-8 bg-zinc-900 rounded-lg '></View>
      }
      <Text className="text-white font-semibold ml-3 text-base ">{title}</Text>
    </TouchableOpacity >
  )
}