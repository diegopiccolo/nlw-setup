import * as  Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps {
  data: Date,
  onCompletedChange : (completed:number) => void
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>,
  completedHabits: string[]
}

export function HabitsList({ data , onCompletedChange}: HabitsListProps) {

  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api.get('day', {
      params: {
        date: data.toISOString(),
      }
    }).then(response => {
      setHabitsInfo(response.data)
    })
  }, []);


  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits : habitsInfo!.possibleHabits,
      completedHabits,
    })

    onCompletedChange(completedHabits.length);

  }

  const isPastDate = dayjs(data).endOf('day').isBefore(new Date());

  return (

    <div className='flex flex-col mt-6 gap-3'>
      {
        habitsInfo?.possibleHabits.map(habit => {
          return (

            <Checkbox.Root
              key={habit.id}
              checked={habitsInfo.completedHabits.includes(habit.id)}
              className='flex items-center gap-3 group'
              disabled={isPastDate}
              onCheckedChange={() => handleToggleHabit(habit.id)}
            >

              <div className='group-data-[state=checked]:bg-green-500 transition-colors group-data-[state=checked]:border-green-500 h-8 w-8 flex items-center rounded-lg justify-center bg-zinc-900 border-2 border-zinc-800'>
                <Checkbox.Indicator>
                  <Check size={20}
                    className='text-white'
                  />
                </Checkbox.Indicator>
              </div>

              <span
                className='group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400  font-semibold text-xl text-white leading-tight'>
                {habit.title}
              </span>
            </Checkbox.Root>
          )
        })
      }

    </div>

  )
}