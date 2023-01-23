import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/loading";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from "react";


import { generateDaysFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ['D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S'
];
const datesFromYearStart = generateDaysFromYearBeginning();

const minSummaryDatesSize = 18 * 5;
const amountToFil = minSummaryDatesSize - datesFromYearStart.length;

type SummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>

export function Home() {

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps|null>(null);


  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get('/summary');      
      setSummary(response.data);

    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header></Header>

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekday, i) => (
            <Text
              key={`${weekday}-${i}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >{weekday}</Text>
          ))
        }
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        {
          summary &&
          <View className="flex-row flex-wrap">
            {
              datesFromYearStart.map(date => {
                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })
                return (
                  <HabitDay
                    key={date.toISOString()}
                    date={date}
                    amountCompleted={dayWithHabits?.completed}
                    amountOfHabits={dayWithHabits?.amount}
                    onPress={() => navigate("habit", { date: date.toISOString() })}
                  />
                )
              })
            }
            {
              amountToFil > 0 && Array
                .from({ length: amountToFil })
                .map((_, i) => (
                  <View
                    key={i}
                    className="bg-zinc-900 rounded-lg m-1 border-2 border-zinc-800 opacity-40"
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  />
                ))
            }
          </View>
        }
      </ScrollView>
    </View>
  )
}