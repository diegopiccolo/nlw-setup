import { TouchableOpacity, TouchableOpacityProps, Dimensions } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  date: Date;
  amountOfHabits?: number;
  amountCompleted?: number;
}

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) {
  const amountAccomplishedPercent = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);
  return (
    <TouchableOpacity
      {...rest}
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"]: amountAccomplishedPercent === 0,
        ["bg-violet-900 border-violet-700"]: amountAccomplishedPercent > 0 && amountAccomplishedPercent < 20,
        ["bg-violet-800 border-violet-600"]: amountAccomplishedPercent >= 20 && amountAccomplishedPercent < 40,
        ["bg-violet-700 border-violet-500"]: amountAccomplishedPercent >= 40 && amountAccomplishedPercent < 60,
        ["bg-violet-600 border-violet-500"]: amountAccomplishedPercent >= 60 && amountAccomplishedPercent < 80,
        ["bg-violet-500 border-violet-400"]: amountAccomplishedPercent >= 80,
        ["border-white border-4"]: isCurrentDay
      })}
      // "bg-zinc-900 rounded-lg m-1 border-2 border-zinc-800"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}>
    </TouchableOpacity>
  )
}